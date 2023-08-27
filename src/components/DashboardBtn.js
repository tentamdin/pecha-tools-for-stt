"use client";

import React from "react";

const DashboardBtn = ({ label, icon, onClick }) => {
  console.log("label", label);
  return (
    <button
      type="button"
      className=" text-white bg-green-600 hover:bg-green-700 w-1/2 sm:w-1/5 text-base sm:text-lg py-2 px-40 sm:py-4 sm:px-32  rounded-md"
      onClick={onClick}
    >
      <div className="flex whitespace-nowrap justify-center items-center space-x-2">
        <p>{label}</p>
        <div className="flex items-center w-8 h-8">{icon}</div>
      </div>
    </button>
  );
};

export default DashboardBtn;
