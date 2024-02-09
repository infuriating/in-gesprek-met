"use client";

import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import Stemmen from "./components/Stemmen";

export default async function page({
  params,
}: {
  params: { stelling: string };
}) {
  const preloadedStemmen = await preloadQuery(
    api.stemmen.getStemmenFromStelling,
    {
      stellingId: params.stelling,
    }
  );
  return <Stemmen preloadedStemmen={preloadedStemmen} />;
}
