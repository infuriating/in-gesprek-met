import React from "react";
import Header from "./Header";
import { currentUser } from "@clerk/nextjs";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return (
    <div>
      <Header
        isSignedIn={user ? true : false}
        imageUrl={user?.imageUrl || ""}
        role={role}
      />
      <div className="py-4 px-6">{children}</div>
    </div>
  );
}
