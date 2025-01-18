import React, { useState } from "react";

function AdGeneration() {
  const [websites, setWebsites] = useState([
    "Google Ads",
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "Snapchat",
    "Pinterest",
    "Reddit",
    "TikTok",
    "Quora",
    "Yahoo Ads",
    "Bing Ads",
    "Amazon Ads",
    "AdRoll",
  ]);

  const calculateBudgetDistribution = (method) => {
    if (method === "equal") {
      const equalShare = (100 / websites.length).toFixed(2);
      return websites.map((website) => ({ website, budget: parseFloat(equalShare) }));
    } else {
      const hardcodedTrends = [
        15, 10, 12, 8, 10, 5, 10, 5, 5, 8, 4, 4, 2, 1, 1
      ]; // Random values summing to 100
      return websites.map((website, index) => ({ website, budget: hardcodedTrends[index] || 0 }));
    }
  };

  const [allocationMethod, setAllocationMethod] = useState("equal");
  const [budgetDistribution, setBudgetDistribution] = useState(calculateBudgetDistribution("equal"));

  const handleAllocationChange = (method) => {
    setAllocationMethod(method);
    setBudgetDistribution(calculateBudgetDistribution(method));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Ad Platform Budget Allocation
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Your ad will be displayed across these platforms. Choose how you want to allocate your budget.
        </p>
        <div className="flex justify-center gap-6 mb-8">
          <button
            className={`px-6 py-3 rounded-full font-bold text-lg transition-transform transform ${
              allocationMethod === "equal"
                ? "bg-blue-500 text-white scale-105 shadow-lg"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
            }`}
            onClick={() => handleAllocationChange("equal")}
          >
            Allocate Equally
          </button>
          <button
            className={`px-6 py-3 rounded-full font-bold text-lg transition-transform transform ${
              allocationMethod === "trends"
                ? "bg-green-500 text-white scale-105 shadow-lg"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
            }`}
            onClick={() => handleAllocationChange("trends")}
          >
            Allocate by Trends
          </button>
        </div>
        <ul className="divide-y divide-gray-300 bg-gray-50 rounded-lg shadow-inner">
          {budgetDistribution.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center py-4 px-6 hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-medium text-gray-700">{item.website}</span>
              <span className="text-lg font-semibold text-blue-600">{item.budget}%</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
            onClick={() => alert("Budget distribution confirmed! Proceeding to the next step.")}
          >
            Confirm and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdGeneration;
