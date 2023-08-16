import AudioSegment from "@/components/AudioSegment";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import React from "react";
import { getAnnotatedFiles } from "@/model/action";

const Annotated = async () => {
  const files = await getAnnotatedFiles();

  return (
    <div>
      <AudioSegment files={files} />
    </div>
  );
};

export default Annotated;
