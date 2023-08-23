import Link from "next/link";
import { getUserDetails, getUserTask } from "../model/action";
import AudioTranscript from "@/components/AudioTranscript";

export default async function Home({ searchParams }) {
  const { session } = searchParams;
  console.log("searchParams", searchParams, "param", session);
  const userTasks = await getUserTask(session);
  const userDetail = await getUserDetails(session);

  return (
    <div className="flex flex-col justify-center items-center">
      <AudioTranscript tasks={userTasks} userDetail={userDetail} />
    </div>
  );
}