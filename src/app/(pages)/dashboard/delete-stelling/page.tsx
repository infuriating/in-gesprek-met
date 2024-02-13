import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import DeleteStellingList from "./components/DeleteStellingList";

export default async function page() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  return <DeleteStellingList preloadedStellingen={preloadedStellingen} />;
}
