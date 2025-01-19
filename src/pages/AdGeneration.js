import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux';
import {setBudgetGive, clear, addElement} from '../store/Budget';

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
  const platforms = useMemo(() => [
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
  ], []); // Empty dependency array ensures this runs only once

  const dispatch = useDispatch();
  const prodDesc = useSelector((state) => state.infor.prodDesc);
  // const [analysisResult, setAnalysisResult] = useState(null);
  const [budgetDistribution, setBudgetDistribution] = useState([]);
  const [allocationMethod, setAllocationMethod] = useState("equal");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch analysis from Flask API
  useEffect(() => {
    if (allocationMethod === "trends") {
      fetchAdRecommendations();
    }
  }, [allocationMethod]);

  // Calculate budget distribution based on selected method
  useEffect(() => {
    if (allocationMethod === "equal") {
        const equalShare = (100 / platforms.length).toFixed(2);
        const newEqualDistribution = platforms.map(platform => ({
            website: platform.name,
            budget: parseFloat(equalShare),
        }));
        setBudgetDistribution(newEqualDistribution);
        console.log(newEqualDistribution)
        dispatch(clear());
        newEqualDistribution.forEach(item => {
          dispatch(addElement(item));
      });
        // dispatch(setBudgetGive(newEqualDistribution)); 
    } else if (allocationMethod === "trends") {
        const newTrendDistribution = recommendations.map(item => ({
            website: item.ad_platform,
            budget: item.percentage,
        }));
        setBudgetDistribution(newTrendDistribution);
        console.log(newTrendDistribution);
        dispatch(clear());
        newTrendDistribution.forEach(item => {
          dispatch(addElement(item));
      });
        // dispatch(setBudgetGive(newTrendDistribution)); 
    }
}, [dispatch, allocationMethod, recommendations, platforms]);


  // Function to call the Flask backend
  const fetchAdRecommendations = () => {
    setLoading(true);
    setError(null);

    // const res = temp.substring(0, 50)

    // const encodedDescription = encodeURIComponent(prodDesc);
    const url = `http://127.0.0.1:5003/generate_ad_recommendations?product_description=${prodDesc}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setRecommendations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch data');
        setLoading(false);
      });
  };

  console.log(recommendations);

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
            Choose how you want to allocate your ad budget across platforms.
          </p>

          {/* Allocation Method Buttons */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              className={`px-6 py-3 rounded-full font-medium text-lg transition-transform ${
                allocationMethod === "equal"
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
              }`}
              onClick={() => setAllocationMethod("equal")}
            >
              Allocate Equally
            </button>
            <button
              className={`px-6 py-3 rounded-full font-medium text-lg transition-transform ${
                allocationMethod === "trends"
                  ? "bg-secondary text-white shadow-md scale-105"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:scale-105"
              }`}
              onClick={() => setAllocationMethod("trends")}
            >
              Allocate by Trends
            </button>
          </div>

          {/* Budget Distribution List */}
          <ul className="divide-y divide-border bg-gray-50 rounded-lg shadow-inner">
            {budgetDistribution.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-4 px-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={platforms.find(p => p.name === item.website).icon}
                    className="text-primary text-xl"
                  />
                  <span className="text-lg font-medium text-textPrimary">
                    {item.website}
                  </span>
                </div>
                <span className="text-lg font-semibold text-secondary">
                  {item.budget}%
                </span>
              </li>
            ))}
          </ul>

          {/* Navigation Buttons */}
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
