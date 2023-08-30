"use client";

import React from "react";

const DashboardBtn = ({ label, icon, onClick }) => {
  console.log("label", label);
  return (
    <button
      type="button"
      className="btn btn-wide text-white bg-green-600 hover:bg-green-700 text-base sm:text-lg  rounded-md"
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
