import React from "react";
import DoneIcon from '@mui/icons-material/Done';

function Sidebar({ currentStep }) {
  const steps = [
    "Select Ad Type",
    "Allocate Budget",
    "Launch Campaign",
  ];

  return (
    <div className="h-full w-80 border-r px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 ml-6 mb-8">AdClickMax</h2>
      <ol className="relative space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="relative">
            {index < steps.length - 1 && (
              <span
                className="absolute left-6 top-12 h-5 border-l-2 border-gray-300"
              ></span>
            )}
            <div className="flex items-center gap-4 p-2">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  currentStep >= index
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-500 text-white border-gray-300"
                }`}
              >
                {currentStep > index ? <DoneIcon fontSize="small" /> : index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Sidebar;
