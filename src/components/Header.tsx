"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({
  isSignedIn,
  imageUrl,
  role,
}: {
  isSignedIn: boolean;
  imageUrl: string;
  role: unknown;
}) {
  const pathname = usePathname();
  if (pathname === "/display-actieve-stelling") return;

  return (
    <div className="flex justify-between items-center w-full h-20 px-8 border-b">
      <div className="flex items-center h-full">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            className="h-16 w-full object-contain"
            width={300}
            height={300}
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        {role === "admin" && (
          <Link href="/dashboard">
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        )}
        <Link href="/actieve-stelling">
          <Button>Stemmen</Button>
        </Link>
      </div>
    </div>
  );
}
