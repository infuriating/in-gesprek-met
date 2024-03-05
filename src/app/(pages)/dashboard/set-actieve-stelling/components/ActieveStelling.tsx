"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
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
import { motion } from "framer-motion";
import { toast } from "sonner";
import Tabel from "@/components/Tabel";

export default function ActieveStelling(params: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
}) {
  const stellingen = usePreloadedQuery(params.preloadedStellingen);
  const stelling = usePreloadedQuery(params.actieveStelling);
  const stellingMutation = useMutation(api.actieveStelling.setActiveStelling);

  const huidigeStelling = stellingen.filter(
    (stellingen) => stelling && stellingen.slug === stelling.stellingSlug
  );

  const handleSetActiveStelling = (stellingSlug: string) => {
    toast.info("Stelling wordt nu actief");
    stellingMutation({ stellingSlug: stellingSlug });
    toast.success("Stelling is nu actief");
  };

  return (
    <div className="flex flex-col gap-y-8">
      {huidigeStelling.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{huidigeStelling[0].stelling}</CardTitle>
            <CardDescription>
              gemaakt door {huidigeStelling[0].door}
            </CardDescription>
            <CardContent>
              <Tabel stelling={huidigeStelling[0]} />
            </CardContent>
          </CardHeader>
        </Card>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
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
              <CardFooter>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSetActiveStelling(stelling.slug);
                  }}
                  variant={"destructive"}
                >
                  Zet deze stelling als actief
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
