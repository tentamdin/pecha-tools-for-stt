import AudioTranscript from "@/components/AudioTranscript";
import React from "react";
import { getUnannotatedFiles } from "../../model/action";

const Annotation = async ({ file }) => {
  const files = await getUnannotatedFiles();
  console.log("if one file is passed", file);

  return (
    <div className="flex flex-col justify-center items-center">
      <AudioTranscript files={files} file={file} />
    </div>
  );
};

export default Annotation;
