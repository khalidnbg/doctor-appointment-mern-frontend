import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-stripe`,
          { session_id: sessionId },
          {
            headers: { token }, // Secure token usage
          }
        );

        if (data.success) {
          alert("Payment verified successfully!");
        } else {
          console.error("Payment verification failed:", data.message);
        }
      } catch (error) {
        console.error("Error verifying payment:", error.message);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  return <div>Verifying payment...</div>;
};

export default PaymentSuccess;
