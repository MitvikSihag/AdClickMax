// import React, { useState } from "react";

// function AICampaignPreview() {
//   const [adCopy, setAdCopy] = useState("Buy one, get one free! Limited time offer.");
//   const [adVisual, setAdVisual] = useState("/placeholder-image.jpg"); // Placeholder image URL
//   const [targetPlatforms, setTargetPlatforms] = useState([
//     { platform: "Google Ads", percentage: 30 },
//     { platform: "Facebook", percentage: 20 },
//     { platform: "Instagram", percentage: 25 },
//     { platform: "Twitter", percentage: 15 },
//     { platform: "LinkedIn", percentage: 10 },
//   ]);

//   const handleEditAdCopy = (event) => {
//     setAdCopy(event.target.value);
//   };

//   const handleApproveCampaign = () => {
//     alert("Campaign approved and ready for deployment!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           AI Campaign Preview
//         </h1>
//         <p className="text-lg text-gray-600 text-center mb-8">
//           Review your AI-generated campaign details below.
//         </p>

//         {/* Ad Visual and Copy */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ad Preview</h2>
//           <div className="flex items-center gap-6">
//             <img
//               src={adVisual}
//               alt="Ad Visual"
//               className="w-48 h-48 object-cover border border-gray-300 rounded-lg"
//             />
//             <textarea
//               value={adCopy}
//               onChange={handleEditAdCopy}
//               className="flex-grow border border-gray-300 rounded-lg p-4 focus:ring-blue-500 focus:border-blue-500"
//               rows="5"
//               placeholder="Enter your ad copy here..."
//             ></textarea>
//           </div>
//         </div>

//         {/* Target Platforms */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Target Platforms</h2>
//           <ul className="divide-y divide-gray-200">
//             {targetPlatforms.map((platform, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center py-4 px-6 hover:bg-gray-50 transition-colors"
//               >
//                 <span className="text-lg font-medium text-gray-700">{platform.platform}</span>
//                 <span className="text-lg font-semibold text-blue-600">{platform.percentage}%</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Approve or Edit Campaign */}
//         <div className="text-center">
//           <button
//             className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition mr-4"
//             onClick={handleApproveCampaign}
//           >
//             Approve Campaign
//           </button>
//           <button
//             className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-400 transition"
//             onClick={() => alert("Edit functionality coming soon!")}
//           >
//             Edit Campaign
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AICampaignPreview;
