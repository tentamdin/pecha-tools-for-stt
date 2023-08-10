import AudioSegment from "@/components/AudioSegment";
import Pagination from "@/components/Pagination";
import { getFiles } from "@/app/action";
import Link from "next/link";
import React from "react";

const Annotated = async () => {
  const files = await getFiles("annotated");

  return (
    <div>
      <AudioSegment files={files} />
    </div>
  );
};

export default Annotated;
