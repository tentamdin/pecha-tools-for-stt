import Link from "next/link";
import { getUserDetails, getUserTask } from "../model/action";
import AudioTranscript from "@/components/AudioTranscript";

export default async function Home({ searchParams }) {
  const { session } = searchParams;
  let userTasks;
  let userDetail;
  console.log("searchParams", searchParams, "param", session);
  if (session) {
    userTasks = await getUserTask(session);
    userDetail = await getUserDetails(session);
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto">
      {session === undefined ? (
        <div className="mt-10 text-xl font-semibold">
          please log in to it with correct username - ?session=username
        </div>
      ) : (
        <AudioTranscript tasks={userTasks} userDetail={userDetail} />
      )}
    </div>
  );
}
