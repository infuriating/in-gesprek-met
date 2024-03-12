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
import { motion } from "framer-motion";
import { BookLock } from "lucide-react";

export default function Landing(props: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
  actieveStelling: Preloaded<typeof api.actieveStelling.getActieveStelling>;
}) {
  const stellingen = usePreloadedQuery(props.preloadedStellingen);
  const stelling = usePreloadedQuery(props.actieveStelling);
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
      key="Landing Page"
    >
      {huidigeStelling.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{huidigeStelling[0].stelling}</CardTitle>
            <CardDescription>
              Dit is de{" "}
              <span className="font-medium text-white"> actieve stelling</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="relative px-0">
            <div className="absolute bg-black/30 px-4 py-2 md:px-8 md:py-4 backdrop-blur-sm border border-neutral-100/50 rounded-md flex flex-col justify-center items-center gap-y-4 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
              <BookLock size={64} />
              <p className="max-w-xl text-center font-medium">
                De huidige peiling kan je op het bord bekijken.
              </p>
              <Link className="w-full" href={`/actieve-stelling`}>
                <Button className="w-full">Stem voor deze stelling</Button>
              </Link>
            </div>
            <div className="blur-xs opacity-50">
              <Tabel height={450} stelling={huidigeStelling[0]} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Geen actieve stelling</CardTitle>
            <CardDescription>
              Er is momenteel nog geen actieve stelling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Je kan wel alvast naar de stempagina navigeren zodat je direct klaar
            bent om te stemmen zodra er een stelling actief is.
          </CardContent>
          <CardFooter>
            <Link href="/actieve-stelling">
              <Button className="w-full">Ga naar de stempagina</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
}

// function AuthenticationButtons() {
//   return (
//     <div className="flex flex-col items-center w-full">
//       <SignUpButton>
//         <Button className="w-[full]" variant={"outline"}>
//           Registreer voor een account
//         </Button>
//       </SignUpButton>
//       <SignInButton>
//         <Button variant={"link"} className="w-[full] text-white text-sm">
//           of log hier in
//         </Button>
//       </SignInButton>
//     </div>
//   );
// }
