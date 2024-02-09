"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightSquareIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <Link className="px-4" href="/stellingen">
        <Button className="flex gap-x-2 text-lg" variant={"link"}>
          <ArrowRightSquareIcon className="h-10 w-10" />
          <p className="text-secondary-foreground">Bekijk alle stellingen</p>
        </Button>
      </Link>
      <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Card>
              <CardHeader>
                <CardTitle>Stelling {i}</CardTitle>
                <CardDescription>gemaakt door een gebruiker</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Skeleton className="h-[200px] w-3/4 ml-[12.5%]" />
              </CardContent>
              <CardFooter>
                <Button variant={"outline"} disabled>
                  Log in om te stemmen
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
