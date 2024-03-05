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
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Landing(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.125,
        damping: 10,
        duration: 0.45,
        type: "spring",
      }}
      key={huidigeStelling[0]._id}
    >
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
                <Link href={"/actieve-stelling"}>
                  <Button variant={"outline"}>Log in om te stemmen</Button>
                </Link>
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
    </motion.div>
  );
}
