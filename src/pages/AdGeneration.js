import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
  faSnapchatGhost,
  faPinterestP,
  faRedditAlien,
  faQuora,
  faAmazon,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";
import { faSearch, faAd } from "@fortawesome/free-solid-svg-icons";

function AdGeneration() {
  const platforms = [
    { name: "Google Ads", icon: faGoogle },
    { name: "Facebook", icon: faFacebookF },
    { name: "Instagram", icon: faInstagram },
    { name: "Twitter", icon: faTwitter },
    { name: "LinkedIn", icon: faLinkedinIn },
    { name: "YouTube", icon: faYoutube },
    { name: "Snapchat", icon: faSnapchatGhost },
    { name: "Pinterest", icon: faPinterestP },
    { name: "Reddit", icon: faRedditAlien },
    { name: "Quora", icon: faQuora },
    { name: "Yahoo Ads", icon: faYahoo },
    { name: "Bing Ads", icon: faSearch },
    { name: "Amazon Ads", icon: faAmazon },
    { name: "AdRoll", icon: faAd },
  ];

  const calculateBudgetDistribution = (method) => {
    if (method === "equal") {
      const equalShare = (100 / platforms.length).toFixed(2);
      return platforms.map((platform) => ({
        website: platform.name,
        budget: parseFloat(equalShare),
      }));
    } else {
      const hardcodedTrends = [
        15, 10, 12, 8, 10, 5, 10, 5, 5, 8, 4, 4, 2, 1,
      ]; // Random values summing to 100
      return platforms.map((platform, index) => ({
        website: platform.name,
        budget: hardcodedTrends[index] || 0,
      }));
    }
  };

  const [allocationMethod, setAllocationMethod] = useState("equal");
  const [budgetDistribution, setBudgetDistribution] = useState(
    calculateBudgetDistribution("equal")
  );

  const handleAllocationChange = (method) => {
    setAllocationMethod(method);
    setBudgetDistribution(calculateBudgetDistribution(method));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar currentStep={1} />

      {/* Main Content */}
      <div className="flex-grow bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl bg-card rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-textPrimary text-center mb-6">
            Ad Platform Budget Allocation
          </h1>
          <p className="text-lg text-textSecondary text-center mb-8">
            Your ad will be displayed across these platforms. Choose how you
            want to allocate your budget.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <button
              className={`px-6 py-3 rounded-full font-medium text-lg transition-transform ${
                allocationMethod === "equal"
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
              }`}
              onClick={() => handleAllocationChange("equal")}
            >
              Allocate Equally
            </button>
            <button
              className={`px-6 py-3 rounded-full font-medium text-lg transition-transform ${
                allocationMethod === "trends"
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
              }`}
              onClick={() => handleAllocationChange("trends")}
            >
              Allocate by Trends
            </button>
          </div>
          <ul className="divide-y divide-border bg-gray-50 rounded-lg shadow-inner">
            {budgetDistribution.map((item, index) => {
              const platform = platforms.find((p) => p.name === item.website);

              return (
                <li
                  key={index}
                  className="flex justify-between items-center py-4 px-6 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {platform?.icon ? (
                      <FontAwesomeIcon
                        icon={platform.icon}
                        className="text-primary text-xl"
                      />
                    ) : (
                      <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-700">
                        N/A
                      </span>
                    )}
                    <span className="text-lg font-medium text-textPrimary">
                      {item.website}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-secondary">
                    {item.budget}%
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link to="/">
              <button className="bg-gray-300 text-gray-700 px-6 py-3 mr-8 rounded-full font-medium text-lg hover:bg-gray-400 transition-transform">
                Back
              </button>
            </Link>
            <Link to="/usr">
              <button className="bg-primary text-white px-8 py-3 ml-8 rounded-full font-medium text-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform">
                Confirm and Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdGeneration;
