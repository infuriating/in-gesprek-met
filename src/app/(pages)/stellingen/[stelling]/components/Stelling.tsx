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
import { getTimeAgo } from "@/lib/functions";

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

  const stem = async (id: string, keuze: string, keuzeOptie: string) => {
    setVorigeKeuze(keuze);
    await stemMutation({ userId, id, keuze, keuzeOptie });

    if (huidigeStem?.keuze === keuze) {
      toast.success(`Uw keuze ${keuze} voor de stelling is verwijderd!`);
      return;
    }

    if (vorigeKeuze && vorigeKeuze !== keuze) {
      toast.success(`Uw keuze is gewijzigd van ${vorigeKeuze} naar ${keuze}!`);
    } else {
      toast.success(`Uw keuze ${keuze} voor de stelling is geregistreerd!`);
    }
  };

  return (
    <div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">{stelling.stelling}</h2>
        <p className="text-muted-foreground">
          Stelling van{" "}
          <span className="font-medium text-secondary-foreground">
            {stelling.door}
          </span>
          <p className="text-xs pt-0.5">{getTimeAgo(stelling._creationTime)}</p>
        </p>
      </div>

      {huidigeStem?.keuze ? (
        <p className="pb-4">
          Uw huidige keuze is:
          <span className="font-bold"> {huidigeStem.keuze}</span>
        </p>
      ) : (
        <p className="pb-4">U heeft nog niet gestemd!</p>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
        <Button
          onClick={() =>
            stem(stelling._id, stelling.keuzes.keuze1.naam, "keuze1")
          }
        >
          Stem voor {stelling.keuzes.keuze1.naam}
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            stem(stelling._id, stelling.keuzes.keuze2.naam, "keuze2")
          }
        >
          Stem voor {stelling.keuzes.keuze2.naam}
        </Button>
        {stelling.keuzes.keuze3.naam && (
          <Button
            onClick={() =>
              stem(stelling._id, stelling.keuzes.keuze3.naam, "keuze3")
            }
          >
            Stem voor {stelling.keuzes.keuze3.naam}
          </Button>
        )}
        {stelling.keuzes.keuze4.naam && (
          <Button
            variant={"outline"}
            onClick={() =>
              stem(stelling._id, stelling.keuzes.keuze4.naam, "keuze4")
            }
          >
            Stem voor {stelling.keuzes.keuze4.naam}
          </Button>
        )}
      </div>
      <div className="pt-4">
        <Tabel stelling={stelling} />
      </div>
    </div>
  );
}
