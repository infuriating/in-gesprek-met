"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StemButtons({
  huidigeStelling,
  stemMutation,
  setHuidigeStem,
  vorigeKeuze,
  setVorigeKeuze,
}: {
  huidigeStelling: any;
  stemMutation: any;
  setHuidigeStem: any;
  vorigeKeuze: string | null;
  setVorigeKeuze: any;
}) {
  const [stemCooldown, setStemCooldown] = useState(0);
  const allCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomId = Array(12)
    .fill(0)
    .map(() =>
      allCharacters.charAt(Math.floor(Math.random() * allCharacters.length))
    )
    .join("");

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
      toast.error(`Niet zo snel!`, {
        description: `Je kan over ${stemCooldown} secondes je keuze aanpassen`,
        descriptionClassName: "group-[.toast]:text-neutral-200",
        style: {
          backgroundColor: "#cf4635",
          color: "white",
        },
      });
      return;
    }

    setVorigeKeuze(keuze);
    setHuidigeStem(keuze);
    setStemCooldown(5);
    await stemMutation({ randomId, id, keuze, keuzeOptie });

    localStorage.setItem("huidigeStem", keuze);

    if (vorigeKeuze === keuze) {
      toast.success(`Uw keuze is verwijderd!`, {
        style: {
          backgroundColor: "#002c40",
          color: "white",
        },
      });

      localStorage.setItem("huidigeStem", "");
      setHuidigeStem(null);
      return;
    }

    if (vorigeKeuze && vorigeKeuze !== keuze) {
      toast.success(`Uw keuze is gewijzigd!`, {
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
