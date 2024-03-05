"use client";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tabel from "@/components/Tabel";
import { ArrowRightSquareIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function Landing(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getLatestThree>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
}) {
  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const stelling = usePreloadedQuery(props.actieveStelling);
  const actieveStelling = useQuery(api.actieveStelling.getActieveStelling);
  const { user } = useUser();
  if (!stellingen) return <></>;

  const huidigeStelling = stellingen.filter(
    (stellingen) => stelling && stellingen.slug === stelling.stellingSlug
  );

  return (
    <div>
      <Link className="px-4" href="/stellingen">
        <Button className="flex gap-x-2 text-lg" variant={"link"}>
          <ArrowRightSquareIcon className="h-10 w-10" />
          <p className="text-secondary-foreground">Bekijk alle stellingen</p>
        </Button>
      </Link>
      {huidigeStelling.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{huidigeStelling[0].stelling}</CardTitle>
            <CardDescription>
              Dit is de{" "}
              <span className="font-medium text-white"> actieve stelling</span>
            </CardDescription>
            <CardContent>
              <Tabel height={600} stelling={huidigeStelling[0]} />
            </CardContent>
            <CardFooter>
              {user ? (
                <Link href={`/actieve-stelling`}>
                  <Button>Stem voor de actieve stelling</Button>
                </Link>
              ) : (
                <Button variant={"outline"} disabled>
                  Log in om te stemmen
                </Button>
              )}
            </CardFooter>
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
    </div>
  );
}
