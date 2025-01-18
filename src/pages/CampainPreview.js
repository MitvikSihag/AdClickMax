import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function LaunchCampaign() {
  const [totalBudget, setTotalBudget] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // State for the loader

  const platforms = [
    { name: "Google Ads", percentage: 30 },
    { name: "Facebook", percentage: 25 },
    { name: "Instagram", percentage: 20 },
    { name: "Twitter", percentage: 15 },
    { name: "LinkedIn", percentage: 10 },
  ];

  const calculateAllocatedBudget = () => {
    if (!totalBudget || isNaN(totalBudget)) return [];
    return platforms.map((platform) => ({
      name: platform.name,
      allocated: ((platform.percentage / 100) * parseFloat(totalBudget)).toFixed(2),
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!totalBudget || isNaN(totalBudget) || totalBudget <= 0) {
      newErrors.totalBudget = "Please enter a valid budget in INR.";
    }
    if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits long.";
    }
    if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
      newErrors.cvv = "CVV must be 3 digits long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setLoading(true); // Start loader
      setTimeout(() => {
        setLoading(false); // Stop loader after 3 seconds
        setIsSubmitted(true);
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar currentStep={2} />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Launch Your Campaign
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Enter your budget and payment details to finalize the campaign.
          </p>

          {/* Budget Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Total Budget (INR)</label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              placeholder="Enter total budget (in INR)"
              className={`w-full border ${
                errors.totalBudget ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.totalBudget && <p className="text-red-500 text-sm mt-1">{errors.totalBudget}</p>}
          </div>

          {/* Allocated Budget Table */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budget Allocation</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Platform</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Allocated Budget (INR)</th>
                </tr>
              </thead>
              <tbody>
                {calculateAllocatedBudget().map((platform, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{platform.name}</td>
                    <td className="border border-gray-300 px-4 py-2">₹{platform.allocated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter your card number"
                  className={`w-full border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Enter CVV"
                  className={`w-full border ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link to="/adgnr">
              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition">
                Go Back
              </button>
            </Link>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition"
              onClick={handleSubmit}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Processing..." : "Launch Campaign"}
            </button>
          </div>

          {loading && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}

          {isSubmitted && (
            <div className="mt-8 text-center text-green-600 font-semibold">
              Campaign launched successfully! Thank you for your payment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaunchCampaign;
