"use client";

import React from "react";
import { api } from "../../../../../convex/_generated/api";
import Stelling from "./components/Stelling";
import { preloadQuery } from "convex/nextjs";

export default async function page({
  params,
}: {
  params: { stelling: string };
}) {
  const preloadedStelling = await preloadQuery(api.stelling.getStelling, {
    slug: params.stelling,
  });
  return <Stelling preloadedStelling={preloadedStelling} />;
}
