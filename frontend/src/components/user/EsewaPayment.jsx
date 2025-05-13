import React, { useState } from "react";
import axios from "axios";

const EsewaPayment = () => {
  const [amount, setAmount] = useState("100");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const initiatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call backend to get payment details
      const response = await axios.post("/esewa/initiate", {
        amount: amount,
        productName: "Deluxe Hotel Package",
      });

      setPaymentData(response.data.data); // Store data for form submission
    } catch (err) {
      setError("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  // Render payment form only when paymentData is available
  if (paymentData) {
    return (
      <form
        method="POST"
        action={process.env.REACT_APP_ESEWA_PAYMENT_URL}
        style={{ display: "none" }}
      >
        <input type="hidden" name="amt" value={paymentData.amount} />
        <input type="hidden" name="psc" value="0" />
        <input type="hidden" name="pdc" value="0" />
        <input type="hidden" name="txAmt" value="0" />
        <input type="hidden" name="tAmt" value={paymentData.amount} />
        <input type="hidden" name="pid" value={paymentData.productId} />
        <input type="hidden" name="scd" value={paymentData.merchantCode} />
        <input
          type="hidden"
          name="su"
          value={`${window.location.origin}/payment/success`}
        />
        <input
          type="hidden"
          name="fu"
          value={`${window.location.origin}/payment/failure`}
        />
      </form>
    );
  }

  return (
    <div className="flex items-center justify-center px-15">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-6">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Book & Pay with eSewa
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Package Name
            </label>
            <input
              type="text"
              value="Deluxe Hotel Package"
              readOnly
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (NPR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            onClick={initiatePayment}
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-2 rounded-xl transition-all duration-300 shadow-md ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Pay with eSewa"}
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          * You'll be redirected to eSewa's secure portal to complete your
          payment.
        </p>
      </div>
    </div>
  );
};

export default EsewaPayment;
