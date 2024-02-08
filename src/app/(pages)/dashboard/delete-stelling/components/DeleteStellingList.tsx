"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import React, { use } from "react";
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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteStellingList(params: {
  preloadedStellingen: Preloaded<typeof api.stelling.getAll>;
}) {
  const stellingen = usePreloadedQuery(params.preloadedStellingen);
  const deleteMutation = useMutation(api.stelling.deleteStelling);
  const router = useRouter();

  const handleDelete = async (e: any, stellingId: string) => {
    e.preventDefault();

    await deleteMutation({ id: stellingId });
    toast.success("Stelling verwijderd");

    router.push("/dashboard");
  };
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <h2 className="mb-4 text-muted-foreground">Verwijder een stelling</h2>
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
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant={"destructive"}>
                      Verwijder deze stelling
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Weet je zeker dat je de stelling{" "}
                        <span className="text-primary">
                          {stelling.stelling}
                        </span>{" "}
                        wilt verwijderen?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Deze actie kan niet ongedaan worden gemaakt.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => handleDelete(e, stelling._id)}
                      >
                        Verwijder
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
