"use client";

import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import Tabel from "../../../../../components/Tabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "@clerk/nextjs/server";

export default function Stelling(params: {
  preloadedStelling: Preloaded<typeof api.stelling.getStelling>;
  user: User | null;
}) {
  const user = params.user;
  const userId = user?.id;

  const stelling = usePreloadedQuery(params.preloadedStelling);
  const actieveStelling = useQuery(api.actieveStelling.getActieveStelling);

  const huidigeStem = useQuery(api.stemmen.getStem, {
    // @ts-expect-error - string | undefined is not assignable to type string
    userId,
    // @ts-expect-error - stelling is possibly null
    stellingId: stelling._id,
  });

  if (!stelling) return <></>;
  if (!userId) return <></>;
  return (
    <div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">{stelling.stelling}</h2>
        <div className="font-medium text-muted-foreground">
          {!actieveStelling ? (
            "Status is aan het laden..."
          ) : stelling.slug !== actieveStelling?.stellingSlug ? (
            <p>
              Deze stelling is
              <span className="font-medium text-red-500"> inactief</span>
            </p>
          ) : (
            <div className="flex flex-col gap-y-1">
              <p>
                Deze stelling is
                <span className="font-medium text-white"> actief</span>
              </p>
              <Link href={"actieve-stelling"} className="py-2">
                <Button>Stem hier op de stelling!</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {huidigeStem?.keuze ? (
        <p className="pb-4">
          Uw keuze voor deze stelling was
          <span className="font-bold"> {huidigeStem.keuze}</span>
        </p>
      ) : (
        <p className="pb-4">U heeft niet voor deze stelling gestemd!</p>
      )}
      <div className="pt-4">
        <Tabel stelling={stelling} />
      </div>
    </div>
  );
}
