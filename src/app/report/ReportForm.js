"use client";
import DateInput from "@/components/DateInput";
import Select from "@/components/Select";
import { generateUserReportByGroup } from "@/model/user";
import React, { useEffect, useRef, useState } from "react";

const ReportForm = ({ options, title, label, setUsers }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [fromDate, setFromDate] = useState(""); // State for "From" date
  const [toDate, setToDate] = useState(""); // State for "To" date
  const ref = useRef(null);

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    console.log("from:", event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    console.log("to:", event.target.value);
  };

  useEffect(() => {
    // When a group is selected
    if (selectedOption) {
      console.log("when a group is selected", selectedOption, fromDate, toDate);
      getUserReportByGroup();
    }
  }, [toDate, fromDate, selectedOption]);

  const getUserReportByGroup = async () => {
    const usersOfGroup = await generateUserReportByGroup(
      selectedOption,
      fromDate,
      toDate
    );
    setUsers(usersOfGroup);
  };

  return (
    <>
      <form
        ref={ref}
        className="flex flex-col md:flex-row justify-around items-center md:items-end space-y-5 space-x-0 md:space-y-0 md:space-x-10"
      >
        <Select
          title={title}
          label={label}
          options={options}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <DateInput
            label="From"
            selectedDate={fromDate}
            handleDateChange={handleFromDateChange}
          />
          <DateInput
            label="To"
            selectedDate={toDate}
            handleDateChange={handleToDateChange}
          />
        </div>
      </form>
    </>
  );
};

export default ReportForm;
