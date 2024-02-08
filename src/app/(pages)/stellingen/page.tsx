"use client";

import React from "react";
import { api } from "../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import Stellingen from "./components/Stellingen";

export default async function page() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  return <Stellingen preloadedStellingen={preloadedStellingen} />;
}
