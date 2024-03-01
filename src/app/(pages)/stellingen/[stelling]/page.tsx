import React from "react";
import { api } from "../../../../../convex/_generated/api";
import Stelling from "./components/Stelling";
import { preloadQuery } from "convex/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function page({
  params,
}: {
  params: { stelling: string };
}) {
  const preloadedStelling = await preloadQuery(api.stelling.getStelling, {
    slug: params.stelling,
  });

  const user = await currentUser();
  return (
    <Stelling
      preloadedStelling={preloadedStelling}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
}
