"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
          backgroundColor: "#cf4635",
          color: "white",
        },
      });
      return;
    }

    setVorigeKeuze(keuze);
    setStemCooldown(5);
    await stemMutation({ userId, id, keuze, keuzeOptie });

    if (huidigeStem?.keuze === keuze) {
      toast.success(`Uw keuze is verwijderd!`, {
        style: {
          backgroundColor: "#002c40",
          color: "white",
        },
      });
      return;
    }

    if (vorigeKeuze && vorigeKeuze !== keuze) {
      toast.success(`Uw keuze is gewijzigd van ${vorigeKeuze} naar ${keuze}!`, {
        style: {
          backgroundColor: "#002c40",
          color: "white",
        },
      });
    } else {
      toast.success(`Uw keuze is geregistreerd!`, {
        style: {
          backgroundColor: "#684c9f",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="flex items-center flex-col gap-x-6 gap-y-4 pb-4 text-center">
      <div
        className="bg-primary flex justify-center items-center rounded-md px-4 py-8 h-24 w-full lg:text-lg cursor-pointer hover:bg-primary/90 transition-colors"
        onClick={() =>
          stem(
            huidigeStelling[0]._id,
            huidigeStelling[0].keuzes.keuze1.naam,
            "keuze1"
          )
        }
      >
        <p>{huidigeStelling[0].keuzes.keuze1.naam}</p>
      </div>
      <div
        className="bg-primary flex justify-center items-center rounded-md px-4 py-8 h-24 w-full lg:text-lg cursor-pointer hover:bg-primary/90 transition-colors"
        onClick={() =>
          stem(
            huidigeStelling[0]._id,
            huidigeStelling[0].keuzes.keuze2.naam,
            "keuze2"
          )
        }
      >
        <p>{huidigeStelling[0].keuzes.keuze2.naam}</p>
      </div>
      {huidigeStelling[0].keuzes.keuze3.naam && (
        <div
          className="bg-primary flex justify-center items-center rounded-md px-4 py-8 h-24 w-full lg:text-lg cursor-pointer hover:bg-primary/90 transition-colors"
          onClick={() =>
            stem(
              huidigeStelling[0]._id,
              huidigeStelling[0].keuzes.keuze3.naam,
              "keuze3"
            )
          }
        >
          <p>{huidigeStelling[0].keuzes.keuze3.naam}</p>
        </div>
      )}
      {huidigeStelling[0].keuzes.keuze4.naam && (
        <div
          className="bg-primary flex justify-center items-center rounded-md px-4 py-8 h-24 w-full lg:text-lg cursor-pointer hover:bg-primary/90 transition-colors"
          onClick={() =>
            stem(
              huidigeStelling[0]._id,
              huidigeStelling[0].keuzes.keuze4.naam,
              "keuze4"
            )
          }
        >
          <p>{huidigeStelling[0].keuzes.keuze4.naam}</p>
        </div>
      )}
    </div>
  );
}
