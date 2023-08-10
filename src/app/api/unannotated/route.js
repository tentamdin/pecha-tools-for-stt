import prisma from "@/lib/db";
import { s3, bucketName } from "@/lib/aws";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("when unannotated api is call");
  try {
    const files = await prisma.files.findMany({
      where: {
        status: {
          equals: "unannotated",
        },
      },
    });
    const fileArray = files.map((list) => {
      const key = list.audioname;
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 3600,
      };
      console.log("params", params);
      const presignedUrl = s3.getSignedUrl("getObject", params);
      return { ...list, audioname: presignedUrl };
    });
    return NextResponse.json({ ...fileArray });
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
