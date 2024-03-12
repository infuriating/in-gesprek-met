"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import StemButtons from "./StemButtons";

export default function ActieveStelling(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
  randomId: string;
}) {
  const [huidigeStem, setHuidigeStem] = useState<string | null>(null);
  const [vorigeKeuze, setVorigeKeuze] = useState<string | null>(null);

  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const stelling = usePreloadedQuery(props.actieveStelling);
  const stemMutation = useMutation(api.stemmen.addStem);

  const huidigeStelling = stellingen.filter(
    (stellingen) => stelling && stellingen.slug === stelling.stellingSlug
  );

  useEffect(() => {
    setHuidigeStem(localStorage.getItem("huidigeStem") ?? "");
    setVorigeKeuze(localStorage.getItem("huidigeStem") ?? "");
  }, []);

  if (!stellingen) return;

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
              {huidigeStem ? (
                <>
                  Uw huidige keuze is:
                  <span className="font-bold"> {huidigeStem}</span>
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
          <CardContent>
            Binnenkort wordt er aangegeven wanneer er weer een nieuwe stelling
            zal starten.
          </CardContent>
        </Card>
      )}

      {huidigeStelling.length > 0 && (
        <StemButtons
          huidigeStelling={huidigeStelling}
          stemMutation={stemMutation}
          setHuidigeStem={setHuidigeStem}
          vorigeKeuze={vorigeKeuze}
          setVorigeKeuze={setVorigeKeuze}
          randomId={props.randomId}
        />
      )}
    </motion.div>
  );
}
