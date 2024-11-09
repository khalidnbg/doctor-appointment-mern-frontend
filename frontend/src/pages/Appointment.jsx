import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]); // will hold arrays of time slots for each day.
  const [slotTime, setSlotTime] = useState("");
  const [slotIndex, setSlotIndex] = useState(0);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Function to generate and set available time slots for a doctor
  const getAvailableSlots = async () => {
    // Reset `docSlots` to an empty array before generating new slots
    setDocSlots([]);

    // Getting the current date to use as the starting point for slot generation
    let today = new Date();

    // Loop to generate slots for the next 7 days, including today
    for (let i = 0; i < 7; i++) {
      // Create a new date object for the current day in the loop
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // Sets `currentDate` to the current loop day (e.g., today, tomorrow, etc.)

      // Set the end time for available slots on this day to 9:00 PM
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 9:00 PM

      // Set the start time for slots on the current day based on whether it's today or a future day
      if (today.getDate() === currentDate.getDate()) {
        // If the day is today:
        // Start from the next hour if it's after 10:00 AM, or start at 10:00 AM
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        // Set minutes to the nearest half-hour mark: either 0 or 30
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, start slots at 10:00 AM
        currentDate.setHours(10); // Set hours to 10:00 AM
        currentDate.setMinutes(0); // Set minutes to 0
      }

      // Array to hold time slots for the current day
      let timeSlots = [];

      // Loop to generate time slots every 30 minutes until the end time (9:00 PM)
      while (currentDate < endTime) {
        // Format the time in HH:MM format (e.g., "10:00", "10:30") for display
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          // Add the current slot to the array of time slots
          timeSlots.push({
            dateTime: new Date(currentDate), // Full date and time of the slot
            time: formattedTime, // Formatted time string for display
          });
        }

        // Move the current time forward by 30 minutes to create the next slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add the generated time slots for the current day to `docSlots` state
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    // console.log(docSlots);
  }, [docSlots]);

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full max-w-72 rounded-lg"
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0">
            {/*  */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-5" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>

              <button className="py-0.5 border px-2 text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* about */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment free:{" "}
              <span className="text-gray-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>

        {/* listing related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
