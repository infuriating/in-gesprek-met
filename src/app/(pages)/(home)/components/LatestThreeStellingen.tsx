"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
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

export default function LatestThreeStellingen(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getLatestThree>;
}) {
  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const { user } = useUser();
  if (!stellingen) return <></>;

  return (
    <div>
      <Link className="px-4" href="/stellingen">
        <Button className="flex gap-x-2 text-lg" variant={"link"}>
          <ArrowRightSquareIcon className="h-10 w-10" />
          <p className="text-secondary-foreground">Bekijk alle stellingen</p>
        </Button>
      </Link>
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
                <CardDescription>gemaakt door {stelling.door}</CardDescription>
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
