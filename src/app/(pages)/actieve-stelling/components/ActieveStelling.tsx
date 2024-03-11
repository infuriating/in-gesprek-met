"use client";

import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@clerk/nextjs/server";
import { motion } from "framer-motion";
import StemButtons from "./StemButtons";

export default function ActieveStelling(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
  user: User | null;
}) {
  const user = props.user;
  const userId = user?.id;

  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const stelling = usePreloadedQuery(props.actieveStelling);
  const stemMutation = useMutation(api.stemmen.addStem);

  const huidigeStelling = stellingen.filter(
    (stellingen) => stelling && stellingen.slug === stelling.stellingSlug
  );
  const huidigeStem = useQuery(api.stemmen.getStem, {
    // @ts-expect-error - userId is possibly undefined
    userId,
    stellingId: huidigeStelling.length > 0 ? huidigeStelling[0]._id : "",
  });

  if (!stellingen) return;
  if (!userId) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.125,
        damping: 10,
        duration: 0.45,
        type: "spring",
      }}
      key="Actieve Stelling"
    >
      {huidigeStelling.length > 0 ? (
        <Card className="py-4 mb-4">
          <CardHeader>
            <CardTitle>{huidigeStelling[0].stelling}</CardTitle>
            <CardDescription>
              {huidigeStem?.keuze ? (
                <>
                  Uw huidige keuze is:
                  <span className="font-bold"> {huidigeStem.keuze}</span>
                </>
              ) : (
                huidigeStelling.length > 0 && <>U heeft nog niet gestemd!</>
              )}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Geen actieve stelling</CardTitle>
            <CardDescription>
              Er is momenteel nog geen actieve stelling.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {huidigeStelling.length > 0 && (
        <StemButtons
          huidigeStelling={huidigeStelling}
          userId={userId}
          stemMutation={stemMutation}
          huidigeStem={huidigeStem}
        />
      )}
    </motion.div>
  );
}
