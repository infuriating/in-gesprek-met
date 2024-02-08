import React from "react";
import Header from "./Header";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="py-4 px-6">{children}</div>
    </div>
  );
}
