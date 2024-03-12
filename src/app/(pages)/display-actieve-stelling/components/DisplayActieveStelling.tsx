"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tabel from "@/components/Tabel";
import QRCode from "react-qr-code";
import Image from "next/image";

export default function DisplayActieveStelling(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
}) {
  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const stelling = usePreloadedQuery(props.actieveStelling);

  const huidigeStelling = stellingen.filter(
    (stellingen) => stelling && stellingen.slug === stelling.stellingSlug
  );

  return (
    <>
      {huidigeStelling.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Huidige stelling</CardTitle>
            <CardDescription className="text-2xl">
              {huidigeStelling[0].stelling}
            </CardDescription>
            <CardContent className="pt-4">
              <Tabel height={475} stelling={huidigeStelling[0]} />
              <div className="grid grid-cols-2 place-items-center">
                <div className="flex items-center gap-x-4 text-xl">
                  <div className="bg-primary h-8 w-8 rounded-full" />
                  {huidigeStelling[0].keuzes.keuze1.naam}:{" "}
                  <span className="font-bold">
                    {huidigeStelling[0].keuzes.keuze1.stemmen} stemmen
                  </span>
                </div>
                <div className="flex items-center gap-x-4 text-xl">
                  <div className="bg-primary h-8 w-8 rounded-full" />
                  {huidigeStelling[0].keuzes.keuze2.naam}:{" "}
                  <span className="font-bold">
                    {huidigeStelling[0].keuzes.keuze2.stemmen} stemmen
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 place-items-center pt-8 w-full">
                <div className="flex flex-col gap-y-4 items-center">
                  <Image
                    src={"/logo.png"}
                    alt="In Gesprek Met"
                    width={500}
                    height={256}
                  />
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-sm">
                    <QRCode
                      value={process.env.NEXT_PUBLIC_QR_CODE_URL!}
                      size={288}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Geen actieve stelling</CardTitle>
            <CardDescription>
              Er is momenteel nog geen actieve stelling.
            </CardDescription>
            <CardContent>
              <div className="grid grid-cols-2 place-items-center py-2 w-full">
                <div className="flex flex-col gap-y-4 items-center"></div>
                <div className="flex flex-col gap-y-4 items-center">
                  <p className="text-2xl font-bold">
                    Scan de QR code om te stemmen!
                  </p>
                  <QRCode
                    value={process.env.NEXT_PUBLIC_QR_CODE_URL!}
                    size={256}
                  />
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
