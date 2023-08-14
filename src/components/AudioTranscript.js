"use client";

import { updateFiles } from "@/app/action";
import React, { useState, useRef, useEffect } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AudioPlayer } from "./AudioPlayer";
import ActionButtons from "./ActionButtons";
import { redirect, useRouter } from "next/navigation";

const AudioTranscript = ({ files, file }) => {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    // listening to keyborad events to trigger shortcuts
    document.addEventListener("keydown", handleKeyDown);
    // check if state object, when redirect from audio segment comp. for single file obj
    if (file) {
      setTranscript(file?.transcript);
      console.log("file value", file);
      console.log("Effect ran only once");
    } else {
      setTranscript(files[index].transcript);
    }
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
      <div className="border rounded-md shadow-sm shadow-gray-400 w-4/5 p-5 mt-10">
        <div className="flex flex-col gap-5 items-center">
          <AudioPlayer
            files={files}
            index={index}
            audioRef={audioRef}
            file={file}
          />
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
        index={index}
        files={files}
        transcript={transcript}
        file={file}
      />
    </>
  );
};

export default AudioTranscript;
