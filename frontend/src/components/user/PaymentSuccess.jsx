import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const queryParams = new URLSearchParams(location.search);

      try {
        await axios.get(`/esewa/verify?${queryParams.toString()}`);
        // You might want to show order details here
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/payment/failure");
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
