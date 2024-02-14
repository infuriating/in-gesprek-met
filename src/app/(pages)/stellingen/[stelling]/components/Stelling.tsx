"use client";

import React from "react";
import { api } from "../../../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import Tabel from "../../../../../components/Tabel";
import { useUser } from "@clerk/nextjs";

export default function Stelling(params: {
  preloadedStelling: Preloaded<typeof api.stelling.getStelling>;
}) {
  const { user } = useUser();
  const userId = user?.id;

  const stelling = usePreloadedQuery(params.preloadedStelling);
  const huidigeStem = useQuery(api.stemmen.getStem, {
    // @ts-expect-error - userId is possibly undefined
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
        <p className="font-medium text-muted-foreground">
          {stelling.beeindigd ? (
            <>
              Deze stelling is
              <span className="font-medium text-red-500"> beeindigd</span>
            </>
          ) : (
            <>
              Deze stelling is
              <span className="font-medium text-white"> actief</span>
            </>
          )}
        </p>
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
