"use client";
import { createTasksFromCSV } from "@/model/task";
import React, { useState, useRef } from "react";
import Papa from "papaparse";

const TaskForm = ({ groups }) => {
  const ref = useRef(null);
  const [selectedFile, setSelectedFile] = useState([]);

  console.log("selectedFile", selectedFile);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    //  Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        console.log(results);
        setSelectedFile(results?.data);
      },
    });
  };

  return (
    <>
      <form
        ref={ref}
        className="flex flex-col sm:flex-row justify-center items-center sm:items-end mt-10 space-y-5 space-x-0 sm:space-y-0 sm:space-x-10"
      >
        <div className="form-control">
          <label className="label" htmlFor="group_id">
            <span className="label-text text-base font-semibold">Group</span>
          </label>
          <select
            id="group_id"
            name="group_id"
            className="select select-bordered overflow-y-scroll w-80"
            required
          >
            <option value="">Select group</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="file_name">
            <span className="label-text text-base font-semibold">
              Choose a file (CSV only):
            </span>
          </label>
          <input
            id="file_name"
            name="file_name"
            accept=".csv"
            type="file"
            required
            className="file-input file-input-bordered file-input-accent max-w-xs"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-accent"
          formAction={async (formData) => {
            ref.current?.reset();
            console.log(
              "formData",
              formData,
              formData.get("group_id"),
              formData.get("file_name")
            );
            await createTasksFromCSV(selectedFile, formData);
          }}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default TaskForm;
