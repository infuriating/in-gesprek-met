"use client";

import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tabel from "@/components/Tabel";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Stellingen(params: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
}) {
  const stellingen = usePreloadedQuery(params.preloadedStellingen);

  const actieveStelling = useQuery(api.actieveStelling.getActieveStelling);

  return (
    <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
      {stellingen.map((stelling, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.125,
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
                      <p>
                        Deze stelling is
                        <span className="font-medium text-white"> actief</span>
                      </p>
                    </>
                  )}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Tabel stelling={stelling} height={200} />
            </CardContent>
            <CardFooter>
              <Link href={`/stellingen/${stelling.slug}`}>
                <Button>Bekijk deze stelling</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
