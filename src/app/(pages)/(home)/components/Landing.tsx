"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tabel from "@/components/Tabel";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Landing(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
}) {
  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  if (!stellingen) return <></>;

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
      key="Landing Page"
    >
      <div className="flex flex-col items-center text-center gap-y-2 py-6">
        <p className="text-4xl font-semibold">Bedankt voor het stemmen!</p>
        <p className="max-w-xl text-lg text-neutral-300">
          Wij hopen dat jullie hebben genoten van het evenement en dat jullie
          van de mogelijkheid hadden om live mee te stemmen!
        </p>
      </div>
      <p className="text-center text-xl py-2 font-bold">
        Zie hieronder de uitslagen van de stellingen
      </p>
      <div className="grid md:grid-cols-3 gap-6 py-4">
        {stellingen.map((stelling) => (
          <Card key={stelling._id}>
            <CardHeader>
              <CardTitle>{stelling.stelling}</CardTitle>
              <CardDescription>
                {stelling.keuzes.keuze1.naam}:{" "}
                <span className="font-bold text-white">
                  {stelling.keuzes.keuze1.stemmen} stemmen
                </span>
              </CardDescription>
              <CardDescription>
                {stelling.keuzes.keuze2.naam}:{" "}
                <span className="font-bold text-white">
                  {stelling.keuzes.keuze2.stemmen} stemmen
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2 px-1">
              <Tabel height={250} stelling={stelling} />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col items-center py-2">
        <p className="text-muted-foreground">Website gemaakt door</p>
        <div className="grid grid-cols-2 py-4 gap-4 text-center">
          <div className="border border-neutral-200/20 rounded-md px-6 py-3">
            <p className="text-xl font-semibold">Lars Werner</p>
            <div className="py-2 flex justify-center gap-x-4">
              <Link
                href={
                  "https://www.linkedin.com/in/lars-franciscus-andries-werner-a3341125a"
                }
                target="_blank"
              >
                <Linkedin size={24} fill="white" />
              </Link>
              <Link href={"https://github.com/LFAGC"} target="_blank">
                <Github size={24} fill="white" />
              </Link>
            </div>
          </div>
          <div className="border border-neutral-200/20 rounded-md px-6 py-3">
            <p className="text-xl font-semibold">Luca Kuiper</p>
            <div className="py-2 flex justify-center gap-x-4">
              <Link href={"https://linkedin.com/in/lucakuiper"} target="_blank">
                <Linkedin size={24} fill="white" />
              </Link>
              <Link href={"https://github.com/infuriating"} target="_blank">
                <Github size={24} fill="white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
