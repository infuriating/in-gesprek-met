"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();
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
        {user ? (
          <>
            <Button>
              <SignOutButton>Log uit</SignOutButton>
            </Button>
            <Image
              src={user.imageUrl}
              alt="user"
              className="h-10 rounded-full"
              width={40}
              height={40}
            />
          </>
        ) : (
          <>
            <Button>
              <SignInButton>Log in</SignInButton>
            </Button>
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
