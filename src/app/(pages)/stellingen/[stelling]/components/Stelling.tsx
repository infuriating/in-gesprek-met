"use client";

import React, { useState } from "react";
import { api } from "../../../../../../convex/_generated/api";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Tabel from "../../../../../components/Tabel";
import { useUser } from "@clerk/nextjs";

export default function Stelling(params: {
  preloadedStelling: Preloaded<typeof api.stelling.getStelling>;
}) {
  const { user } = useUser();
  const userId = user?.id;

  const stelling = usePreloadedQuery(params.preloadedStelling);
  const stemMutation = useMutation(api.stemmen.addStem);
  const huidigeStem = useQuery(api.stemmen.getStem, {
    // @ts-expect-error - userId is possibly undefined
    userId,
    // @ts-expect-error - stelling is possibly null
    stellingId: stelling._id,
  });

  const [vorigeKeuze, setVorigeKeuze] = useState<string | null>(null);
  if (!stelling) return <></>;
  if (!userId) return <></>;

  const stem = async (id: string, keuze: string) => {
    setVorigeKeuze(keuze);
    await stemMutation({ userId, id, keuze });

    if (huidigeStem?.keuze === keuze) {
      toast.success(
        `Uw keuze ${keuze.toUpperCase()} voor de stelling is verwijderd!`
      );
      return;
    }

    if (vorigeKeuze && vorigeKeuze !== keuze) {
      toast.success(
        `Uw keuze is gewijzigd van ${vorigeKeuze.toUpperCase()} naar ${keuze.toUpperCase()}!`
      );
    } else {
      toast.success(
        `Uw keuze ${keuze.toUpperCase()} voor de stelling is geregistreerd!`
      );
    }
  };

  return (
    <div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">{stelling.stelling}</h2>
        <p className="text-muted-foreground">
          Stelling van{" "}
          <span className="font-bold text-secondary-foreground">
            {stelling.door}
          </span>
        </p>
      </div>

      {huidigeStem?.keuze ? (
        <p className="pb-4">
          Uw huidige keuze is:
          <span className="font-bold">
            {" "}
            {huidigeStem.keuze.toLocaleUpperCase()}
          </span>
        </p>
      ) : (
        <p className="pb-4">U heeft nog niet gestemd!</p>
      )}
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
        <Button onClick={() => stem(stelling._id, "voor")}>Stem voor</Button>
        <Button
          variant={"destructive"}
          onClick={() => stem(stelling._id, "tegen")}
        >
          Stem tegen
        </Button>
        <Button
          variant={"outline"}
          onClick={() => stem(stelling._id, "onbeslist")}
        >
          Onbeslist
        </Button>
      </div>
      <div className="pt-4">
        <Tabel stelling={stelling} />
      </div>
    </div>
  );
}
