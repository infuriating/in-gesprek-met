import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" />
    </div>
  );
}
