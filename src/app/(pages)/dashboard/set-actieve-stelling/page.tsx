import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import ActieveStelling from "./components/ActieveStelling";

export default async function page() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );
  return (
    <ActieveStelling
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
    />
  );
}
