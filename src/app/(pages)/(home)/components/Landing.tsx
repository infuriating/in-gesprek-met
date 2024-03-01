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
import { motion } from "framer-motion";

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
                  <Button>Bekijk de actieve stelling</Button>
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
      <p className="pt-8 py-1 font-medium text-muted-foreground">
        De laatste drie stellingen
      </p>
      <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
        {stellingen.map((stelling, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.15,
              damping: 10,
              duration: 0.45,
              type: "spring",
            }}
            key={stelling._id}
          >
            <Card>
              <CardHeader>
                <CardTitle>{stelling.stelling}</CardTitle>
                <CardDescription>
                  <span className="font-medium text-muted-foreground">
                    {!actieveStelling ? (
                      "Status is aan het laden..."
                    ) : stelling.slug !== actieveStelling?.stellingSlug ? (
                      <>
                        Deze stelling is
                        <span className="font-medium text-red-500">
                          {" "}
                          inactief
                        </span>
                      </>
                    ) : (
                      <>
                        Deze stelling is
                        <span className="font-medium text-white"> actief</span>
                      </>
                    )}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Tabel stelling={stelling} height={200} />
              </CardContent>
              <CardFooter>
                {user ? (
                  <Link href={`/stellingen/${stelling.slug}`}>
                    <Button>Bekijk deze stelling</Button>
                  </Link>
                ) : (
                  <Button variant={"outline"} disabled>
                    Log in om te stemmen
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
