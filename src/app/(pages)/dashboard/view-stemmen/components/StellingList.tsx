"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../../convex/_generated/api";
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
import { ArrowLeftSquareIcon } from "lucide-react";

export default function StellingList(params: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
}) {
  const stellingen = usePreloadedQuery(params.preloadedStellingen);
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <h2 className="mb-4 text-muted-foreground">
        Bekijk stemmen van een stelling
      </h2>
      <Link className="px-4" href="/dashboard">
        <Button className="flex gap-x-2 text-lg" variant={"link"}>
          <ArrowLeftSquareIcon className="h-10 w-10" />
          <p className="text-secondary-foreground">Terug naar het dashboard</p>
        </Button>
      </Link>
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
                <CardDescription>gemaakt door {stelling.door}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Tabel stelling={stelling} height={200} />
              </CardContent>
              <CardFooter>
                <Link href={`/dashboard/view-stemmen/${stelling._id}`}>
                  <Button variant={"outline"}>
                    Bekijk de stemmen van deze stelling
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
