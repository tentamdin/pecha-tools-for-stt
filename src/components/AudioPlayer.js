import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

export const AudioPlayer = ({ files, index, audioRef, file }) => {
  return (
    <>
      <audio
        controls
        className="w-4/5"
        controlsList="nodownload"
        ref={audioRef}
        key={file ? file?.id : files[index]?.id}
      >
        <source
          src={file ? file?.audioname : files[index]?.audioname}
          type="audio/mp3"
        />
      </audio>
    </>
  );
};
