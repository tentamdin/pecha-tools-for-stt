"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const AudioTranscript = ({ files, id }) => {
  const [index, setIndex] = useState(0);
  const [transcript, setTranscript] = useState(
    files ? files[0].transcript : ""
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    // listening to keyborad events to trigger shortcuts
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // handle shortcut key "p"
  const handleKeyDown = (event) => {
    console.log("Pressed key:", event.key, " code:", event.code);
    if (event.code === "Space") {
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

  return (
    <div className="flex flex-col gap-5 items-center">
      <audio
        controls
        className="w-4/5"
        controlsList="nodownload"
        ref={audioRef}
      >
        <source src={files?.[index].audioname} type="audio/mp3" />
      </audio>
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
  );
};

export default AudioTranscript;
