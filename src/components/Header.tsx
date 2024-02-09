"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

export default function Header({
  isSignedIn,
  imageUrl,
  role,
}: {
  isSignedIn: boolean;
  imageUrl: string;
  role: unknown;
}) {
  return (
    <div className="flex justify-between items-center w-full h-16 px-8 border-b">
      <div className="flex items-center gap-x-4">
        <Link href="/">
          {/* <Image
          src="/logo.png"
          alt="logo"
          className="h-10"
          width={40}
          height={40}
        /> */}
          <h1 className="text-xl font-bold">StemApp</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        {role === "admin" && (
          <Link href="/dashboard">
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        )}
        {isSignedIn ? (
          <>
            <SignOutButton>
              <Button>Log out</Button>
            </SignOutButton>
            <Image
              src={imageUrl}
              alt="user"
              className="h-10 rounded-full hidden md:block"
              width={40}
              height={40}
            />
          </>
        ) : (
          <>
            <SignInButton>
              <Button>Log in</Button>
            </SignInButton>
            <Skeleton className="h-10 w-10 rounded-full" />
          </>
        )}
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
