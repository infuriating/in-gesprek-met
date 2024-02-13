import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import StellingList from "./components/StellingList";

export default async function page() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  return <StellingList preloadedStellingen={preloadedStellingen} />;
}
