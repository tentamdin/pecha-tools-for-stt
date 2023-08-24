"use client";

import { updateTask } from "@/model/action";
import React, { useState, useRef, useEffect } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AudioPlayer } from "./AudioPlayer";
import ActionButtons from "./ActionButtons";

const AudioTranscript = ({ tasks, userDetail }) => {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [anyTask, setAnyTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let lastTaskIndex = tasks.length != 0 ? tasks?.length - 1 : 0;
  const { role } = userDetail;

  useEffect(() => {
    let isMounted = true;
    console.log("user details", userDetail, "user task", tasks, lastTaskIndex);
    if (tasks.length != 0) {
      setAnyTask(true);
      setIsLoading(false);
      switch (role) {
        case "TRANSCRIBER":
          console.log("inside switch 1", tasks[index].transcript === null);
          tasks[index].transcript != null
            ? setTranscript(tasks[index].transcript)
            : setTranscript(tasks[index].inference_transcript);
          break;
        case "REVIEWER":
          tasks[index].reviewed_transcript != null
            ? setTranscript(tasks[index].reviewed_transcript)
            : setTranscript(tasks[index].transcript);
          break;
        case "FINAL_REVIEWER":
          setTranscript(tasks[index].reviewed_transcript);
          break;
        default:
          break;
      }
    } else {
      setAnyTask(false);
      setIsLoading(false);
      console.log("No task", tasks);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlayRate = (speed) => {
    audioRef.current.playbackRate = speed;
    console.log("Pitched preserved", audioRef.current.preservesPitch);
  };

  const speedRate = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const updateTaskAndIndex = async (action, transcript, task) => {
    console.log("in updateFileAndIndex");
    const { id } = task;
    console.log("task id", id, "role", role);
    try {
      const response = await updateTask(action, id, transcript, task, role);
      if (lastTaskIndex != index) {
        role === "TRANSCRIBER"
          ? setTranscript(tasks[index + 1].inference_transcript)
          : role === "REVIEWER"
          ? setTranscript(tasks[index + 1].transcript)
          : setTranscript(tasks[index + 1].reviewed_transcript);
        setIndex(index + 1);
      } else {
        setAnyTask(false);
      }
      console.log("response", response);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">loading...</h1>
        </div>
      ) : anyTask ? (
        <>
          {(role === "REVIEWER" || role === "FINAL_REVIEWER") && (
            <div>
              <p className="mt-5">
                <strong>Transcriber : </strong>
                <span>{tasks[index].transcriber?.name}</span>
              </p>
              {role === "FINAL_REVIEWER" && (
                <p className="mt-2">
                  <strong>Reviewer : </strong>
                  <span>{tasks[index].reviewer?.name}</span>
                </p>
              )}
            </div>
          )}

          <div className="border rounded-md shadow-sm shadow-gray-400 w-4/5 p-5 mt-10">
            <div className="flex flex-col gap-5 items-center">
              <AudioPlayer tasks={tasks} index={index} audioRef={audioRef} />
              <textarea
                value={transcript || ""}
                onChange={(e) => setTranscript(e.target.value)}
                className="rounded-md p-4 h-96 border border-slate-400 w-11/12"
                placeholder="Type here..."
                id="transcript"
              ></textarea>
              <div className="flex flex-wrap gap-6 justify-center">
                <button
                  className="bg-white text-gray-800 py-2.5 px-5 border border-gray-400 rounded-lg shadow"
                  onClick={() => handlePlayPause()}
                >
                  {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
                </button>
                {speedRate.map((speed) => {
                  return (
                    <button
                      key={speed}
                      onClick={() => handlePlayRate(speed)}
                      className="text-white bg-[#583fcf] hover:bg-purple-600 font-semibold rounded-lg text-sm px-5 py-2.5 outline-none"
                    >
                      {speed === 1 ? "Normal" : speed + " speed"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <ActionButtons
            updateTaskAndIndex={updateTaskAndIndex}
            tasks={tasks}
            index={index}
            transcript={transcript}
            role={role}
          />
        </>
      ) : (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">
            No task found, will allocate soon
          </h1>
        </div>
      )}
    </>
  );
};

export default AudioTranscript;
