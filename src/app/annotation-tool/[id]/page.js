import { getFileById } from "@/model/action";
import React from "react";
import Annotation from "../page";

const AnnotationById = async ({ params }) => {
  console.log("Params", params);
  const { id } = params;
  const file = await getFileById(parseInt(id));
  return (
    <>
      <Annotation file={file} />
    </>
  );
};

export default AnnotationById;
