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
      {huidigeStelling && (
        <Card>
          <CardHeader>
            <CardTitle>{huidigeStelling[0].stelling}</CardTitle>
            <CardDescription>
              Deze stelling is momenteel
              <span className="font-medium text-white"> actief</span>
            </CardDescription>
            <CardContent>
              <Tabel height={600} stelling={huidigeStelling[0]} />
              <div className="grid grid-cols-2 place-items-center py-2 w-full">
                <div className="flex flex-col gap-y-4 items-center"></div>
                <div className="flex flex-col gap-y-4 items-center">
                  <p className="text-2xl font-bold">
                    Scan de QR code om te stemmen
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