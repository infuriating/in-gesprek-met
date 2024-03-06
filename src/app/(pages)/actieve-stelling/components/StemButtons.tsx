"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";

export default function StemButtons({
  huidigeStelling,
  userId,
  stemMutation,
  huidigeStem,
}: {
  huidigeStelling: any;
  userId: string;
  stemMutation: any;
  huidigeStem: any;
}) {
  const [vorigeKeuze, setVorigeKeuze] = useState<string | null>(null);
  const [stemCooldown, setStemCooldown] = useState(0);

  useEffect(() => {
    if (stemCooldown > 0) {
      const interval = setInterval(() => {
        setStemCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stemCooldown]);

  const stem = async (id: string, keuze: string, keuzeOptie: string) => {
    if (stemCooldown > 0) {
      toast.error(`Je kan over ${stemCooldown} seconden weer stemmen!`, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    }

    setVorigeKeuze(keuze);
    setStemCooldown(5);
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
    <div className="grid gap-x-6 gap-y-4 pb-4">
      <Button
        className="h-24 text-lg"
        onClick={() =>
          stem(
            huidigeStelling[0]._id,
            huidigeStelling[0].keuzes.keuze1.naam,
            "keuze1"
          )
        }
      >
        {huidigeStelling[0].keuzes.keuze1.naam}
      </Button>
      <Button
        className="h-24 text-lg"
        onClick={() =>
          stem(
            huidigeStelling[0]._id,
            huidigeStelling[0].keuzes.keuze2.naam,
            "keuze2"
          )
        }
      >
        {huidigeStelling[0].keuzes.keuze2.naam}
      </Button>
      {huidigeStelling[0].keuzes.keuze3.naam && (
        <Button
          className="h-24 text-lg"
          onClick={() =>
            stem(
              huidigeStelling[0]._id,
              huidigeStelling[0].keuzes.keuze3.naam,
              "keuze3"
            )
          }
        >
          {huidigeStelling[0].keuzes.keuze3.naam}
        </Button>
      )}
      {huidigeStelling[0].keuzes.keuze4.naam && (
        <Button
          className="h-24 text-lg"
          onClick={() =>
            stem(
              huidigeStelling[0]._id,
              huidigeStelling[0].keuzes.keuze4.naam,
              "keuze4"
            )
          }
        >
          {huidigeStelling[0].keuzes.keuze4.naam}
        </Button>
      )}
    </div>
  );
}
