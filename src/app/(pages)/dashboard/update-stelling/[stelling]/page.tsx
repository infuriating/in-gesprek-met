import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import UpdateStelling from "./components/UpdateStelling";
import { preloadQuery } from "convex/nextjs";

export default async function page({
  params,
}: {
  params: { stelling: string };
}) {
  const preloadedStelling = await preloadQuery(api.stelling.getStelling, {
    slug: params.stelling,
  });
  return <UpdateStelling preloadedStelling={preloadedStelling} />;
}
