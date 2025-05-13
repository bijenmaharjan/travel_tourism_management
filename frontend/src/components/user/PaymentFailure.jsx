import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
