import React from "react";
import Header from "./Header";
import PageTransitionEffect from "./PageTransitionEffect";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <PageTransitionEffect>
        <div className="py-4 px-6">{children}</div>
      </PageTransitionEffect>
    </div>
  );
}
