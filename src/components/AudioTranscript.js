"use client";

import { updateFiles } from "@/model/action";
import React, { useState, useRef, useEffect } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AudioPlayer } from "./AudioPlayer";
import ActionButtons from "./ActionButtons";
import { redirect, useRouter } from "next/navigation";

const AudioTranscript = ({ tasks, userDetail }) => {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const router = useRouter();
  const [anyTask, setAnyTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {        
    let isMounted = true;
    const { role_id: roleId } = userDetail;
    console.log("user details", userDetail, roleId, tasks);
    if (tasks.length != 0) {
      setAnyTask(true)
      setIsLoading(false)
      switch (roleId) {
        case 1:
          console.log("inside switch 1");
          setTranscript(tasks[index].inference_transcript);
          break;
        case 2:
          setTranscript(tasks[index].transcript);
          break;
        case 3:
          setTranscript(tasks[index].reviewed_transcript);
          break;
        default:
          break;
      }
    } else {
      setAnyTask(false)
      setIsLoading(false)
      console.log("No task", tasks);
    }
    // listening to keyborad events to trigger shortcuts
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
      isMounted = false; 
    };
  }, []);

  // handle shortcut key "p"
  const handleKeyDown = (event) => {
    console.log("Pressed key:", event.key, " code:", event.code);
    if (event.key === "p") {
      setIsPlaying(!isPlaying);
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
  };

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

  const updateFileAndIndex = async (status, id, transcript) => {
    console.log("in updateFileAndIndex");
    try {
      const response = await updateFiles(status, id, transcript);
      if (file && response) {
        router.push("/");
      } else {
        setTranscript(files[index + 1].transcript);
        setIndex(index + 1);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      {isLoading ? 
        (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">loading...</h1>
        </div>
        ) : anyTask ? 
        (
        <>
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
            updateFileAndIndex={updateFileAndIndex}
            tasks={tasks}
            index={index}
            transcript={transcript}/>
        </>
      ) : (
        <div className="flex min-h-screen flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">No task found, will allocate sonon</h1>
        </div>
      )}
    </>
  );
};

export default AudioTranscript;
