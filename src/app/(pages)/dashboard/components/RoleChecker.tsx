"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function RoleChecker({
  role,
  children,
}: {
  role: unknown;
  children: React.ReactNode;
}) {
  const router = useRouter();
  if (role !== "admin") router.push("/");

  return <div>{children}</div>;
}
