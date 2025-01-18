import React, { useState } from "react";

function HomePage() {
  const [showAiPopup, setShowAiPopup] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [promptText, setPromptText] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleUploadAd = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Uploaded file: ${file.name}`);
    }
  };

  const handleAiPopupSubmit = () => {
    if (!productImage || !companyLogo || !promptText) {
      alert("Please provide all required inputs before submitting.");
      return;
    }
    alert("Submitted to AI for processing!");
    setShowAiPopup(false);
    setProductImage(null);
    setCompanyLogo(null);
    setPromptText("");
  };

  const handleSubmitDetails = () => {
    if (!businessName || !industry) {
      alert("Please fill in all required details before proceeding.");
      return;
    }
    alert("Business details saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome to AdClickMax
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Create professional ads effortlessly. Choose your preferred option below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Upload Existing Ad */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Generate Ad with AI
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your product image and company logo, and let our AI create a stunning ad for you.
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
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
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
            <button
              type="button"
              onClick={handleSubmitDetails}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg font-bold hover:shadow-xl hover:scale-105 transition-transform"
            >
              Save Business Details
            </button>
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
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Upload Company Logo</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg p-2"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Enter AI Prompt</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Describe your ad requirements..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              ></textarea>
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
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
