import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        ABOUT <span className="text-gray-700 font-medium">Us</span>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm to-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
            quae sed sunt possimus nesciunt maxime, autem laboriosam rem totam
            optio. Cupiditate voluptates similique, odio doloremque veniam
            fugiat sit unde itaque.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum quo
            similique asperiores doloribus recusandae sapiente sed distinctio,
            architecto reiciendis! Fugiat et, quod excepturi iste fugit vitae
            sunt repudiandae facilis molestiae?
          </p>
          <b className="text-gray-800">Our vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolor
            consectetur aut illo sit, architecto accusamus autem dignissimos
            doloribus nihil fuga minus temporibus ratione ab, labore, eum
            eligendi exercitationem sapiente!
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
