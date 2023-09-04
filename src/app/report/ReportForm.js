"use client";
import DateInput from "@/components/DateInput";
import Select from "@/components/Select";
import React, { useRef } from "react";

const ReportForm = ({ options, title, label }) => {
  const ref = useRef();
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Report Section</h1>
      <form
        ref={ref}
        className="flex flex-col md:flex-row justify-around items-center md:items-end space-y-5 space-x-0 md:space-y-0 md:space-x-10"
      >
        <Select title={title} label={label} options={options} />
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <DateInput label="From" />
          <DateInput label="To" />
        </div>
      </form>
    </>
  );
};

export default ReportForm;
