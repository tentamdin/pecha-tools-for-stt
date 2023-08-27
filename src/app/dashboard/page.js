import React from "react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col sm:flex-row justify-center items-center space-y-5 space-x-0 sm:space-y-0 sm:space-x-5">
      <Link
        href="/dashboard/user"
        className="bg-blue-600 border-none rounded-md text-white text-center text-base py-2 w-1/2 sm:py-5 sm:text-xl sm:w-1/5"
        type="button"
      >
        User
      </Link>
      <Link
        href="/dashboard/group"
        className="bg-blue-600 border-none rounded-md text-white text-base sm:text-xl py-2 sm:py-5 w-1/2  sm:w-1/5 text-center"
        type="button"
      >
        Group
      </Link>
      <Link
        href="/dashboard/task"
        className="bg-blue-600 border-none rounded-md text-white text-base sm:text-xl py-2 sm:py-5 w-1/2  sm:w-1/5 text-center"
        type="button"
      >
        Task
      </Link>
    </div>
  );
};

export default Dashboard;
