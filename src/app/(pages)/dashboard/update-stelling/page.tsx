"use client";

import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import UpdateStellingList from "./components/UpdateStellingList";

export default async function page() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  return <UpdateStellingList preloadedStellingen={preloadedStellingen} />;
}
