"use client";
import React from "react";

export default function Error({ error, reset }) {
  return (
    <div className="w-full text-center">
      <div className="text-2xl text-red-500">
        Error due to: {error.massage}{" "}
      </div>
      <p>Error</p>
    </div>
  );
}
