import React, { useState } from "react";
import Sidebar from "./Sidebar"; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBusinessName, setIndustry, setPosterImage, setProdDesc } from '../store/Infor';

function HomePage() {
  const [showAiPopup, setShowAiPopup] = useState(false);
  const [productImage, setProductImage] = useState(null);
  // const [businessName, setBusinessName] = useState("");
  // const [industry, setIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  // const { posterImage } = useSelector((state) => state.infor);
  const businessName = useSelector((state) => state.infor.businessName);
  const industry = useSelector((state) => state.infor.industry);
  const dispatch = useDispatch();

  const handleUploadAd = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded file to preview or use it later
      const imageUrl = URL.createObjectURL(file);
  
      // Dispatch the uploaded image URL to Redux
      dispatch(setPosterImage(imageUrl));
  
      // Optional: Show an alert or console log for debugging
      alert(`Uploaded file: ${file.name}`);
      console.log(`Poster image URL: ${imageUrl}`);
  
      // Send the file to the Flask endpoint
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const response = await fetch("http://127.0.0.1:5001/give_product_description", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const productDescription = await response.text();
          console.log("Product Description:", productDescription);
  
          // Optionally store the product description in Redux or state
          dispatch(setProdDesc(productDescription)); // Add this action in Redux
        } else {
          alert("Failed to get product description. Please try again.");
          console.error("Error response:", await response.json());
        }
      } catch (error) {
        alert("An error occurred while uploading the image.");
        console.error("Error:", error);
      }
    }
  };
  

  const handleAiPopupSubmit = async () => {
    if (!productImage) {
      alert("Please upload a product image before submitting.");
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append("image", productImage);
  
    try {
      // Step 1: Call API to get Product Description
      const descriptionResponse = await fetch(
        "http://127.0.0.1:5001/give_product_description",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (descriptionResponse.ok) {
        const productDescription = await descriptionResponse.text();
        console.log("Product Description:", productDescription);
  
        // Store the product description in Redux or state
        dispatch(setProdDesc(productDescription));
  
        // Step 2: Call API to generate the Poster
        const posterResponse = await fetch(
          "http://127.0.0.1:5000/generate_ad_image",
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
            },
            body: formData,
          }
        );
  
        if (posterResponse.ok) {
          const data = await posterResponse.blob(); // Parse the poster image as a blob
          const imageUrl = URL.createObjectURL(data); // Create a local URL for the blob
  
          console.log("Generated Image URL:", imageUrl);
  
          // Store the generated poster in Redux or state
          setGeneratedImageUrl(imageUrl);
          dispatch(setPosterImage(imageUrl));
  
          alert("AI-generated ad image and description are ready!");
        } else {
          alert("Failed to generate ad image. Please try again.");
          const error = await posterResponse.json();
          console.error("Error response:", error);
        }
      } else {
        alert("Failed to get product description. Please try again.");
        const error = await descriptionResponse.json();
        console.error("Error response:", error);
      }
    } catch (error) {
      alert("An error occurred while generating the ad image or description.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setShowAiPopup(false);
    }
  };
  
  
  

  const handleBusinessNameChange = (temp) => {
    dispatch(setBusinessName(temp));
  };
  
  const handleIndustryChange = (temp) => {
    dispatch(setIndustry(temp));
  };
  
  const isProceedEnabled = businessName.trim() !== "" && industry.trim() !== "";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar currentStep={0} />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome to AdClickMax
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Create professional ads effortlessly. Choose your preferred option below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option 1: Upload Existing Ad */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 hover:border-lg transition-colors">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Upload Your Existing Ad
              </h2>
              <p className="text-gray-600 mb-6">
                Already have a professionally designed ad? Upload it here to get started.
              </p>
              <input
                type="file"
                accept="image/*"
                id="upload-ad"
                className="hidden"
                onChange={handleUploadAd}
              />
              <label
                htmlFor="upload-ad"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer"
              >
                Upload Ad
              </label>
            </div>
            {/* Option 2: Generate Ad with AI */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center hover:border-green-400 hover:border-lg transition-colors">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Generate Ad with AI
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your product image, and let our AI create a stunning ad for you.
              </p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
                onClick={() => setShowAiPopup(true)}
              >
                Generate Ad
              </button>
            </div>
          </div>

          {/* Business Details Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => handleBusinessNameChange(e.target.value)}
                  placeholder="Enter your business name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology</option>
                  <option value="hospitality">Hospitality</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to="/adgnr">
                <button
                  type="button"
                  disabled={!isProceedEnabled}
                  className={`px-6 py-2 rounded-lg font-bold text-lg ${
                    isProceedEnabled
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-xl hover:scale-105 transition-transform"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* AI Popup */}
      {showAiPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Generate Ad with AI
            </h2>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Upload Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={(e) => setProductImage(e.target.files[0])}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowAiPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={handleAiPopupSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {generatedImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              AI Generated Ad
            </h2>
            <img
              src={generatedImageUrl}
              alt="Generated Ad"
              className="w-full rounded-lg"
            />
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setGeneratedImageUrl(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
