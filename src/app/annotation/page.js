import AudioTranscript from "@/components/AudioTranscript";
import React from "react";
import {
  BsCheckLg,
  BsXLg,
  BsSlashCircle,
  BsArrowReturnLeft,
} from "react-icons/bs";
import { getFiles } from "../action";
// import { useRouter } from "next/navigation";

const Annotation = async () => {
  const files = await getFiles("unannotated");
  console.log("files", files);
  // const router = useRouter();
  // const {
  //   query: { id },
  // } = router;

  return (
    <div className=" flex flex-col justify-center items-center gap-5">
      <div className="border rounded-md shadow-sm shadow-gray-400 w-4/5 p-5 mt-10">
        <AudioTranscript files={files} />
      </div>

      <div className="fixed bottom-0 flex gap-1 border shadow-sm p-2">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium text-sm p-9"
        >
          <BsCheckLg width="5rem" />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium text-sm p-9"
        >
          <BsXLg />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
        >
          <BsSlashCircle />
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-400 hover:bg-gray-500 font-medium text-sm p-9"
        >
          <BsArrowReturnLeft />
        </button>
      </div>
    </div>
  );
};

export default Annotation;
