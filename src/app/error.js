"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  console.log("Error is", error);

  return (
    <div className="flex flex-col h-screen bg-background items-center justify-center">
      <h1 className="text-5xl font-bold">Something went wrong.</h1>
      <div className="mt-10 text-xl text-red-500 font-semibold">{(error.message)}</div>
    </div>
  );
}
