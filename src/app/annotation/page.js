import AudioTranscript from "@/components/AudioTranscript";
import React from "react";
import { getUnannotatedFiles } from "../action";
// import { useRouter } from "next/navigation";

const Annotation = async () => {
  const files = await getUnannotatedFiles();

  return (
    <div className=" flex flex-col justify-center items-center gap-5">
      <div className="border rounded-md shadow-sm shadow-gray-400 w-4/5 p-5 mt-10">
        <AudioTranscript files={files} />
      </div>
    </div>
  );
};

export default Annotation;
