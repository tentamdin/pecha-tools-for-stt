"use client";
import { createTasksFromCSV } from "@/model/task";
import React, { useState, useRef } from "react";
import Papa from "papaparse";
import Select from "@/components/Select";

const TaskForm = ({ groups }) => {
  const ref = useRef(null);
  const [selectedFile, setSelectedFile] = useState([]);

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
        className="flex flex-col md:flex-row justify-center items-center md:items-end space-y-5 space-x-0 md:space-y-0 md:space-x-10"
      >
        <Select title="group_id" label="Groups" options={groups} />
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
