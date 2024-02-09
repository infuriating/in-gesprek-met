"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
    <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
      {[...Array(6)].map((_, i) => (
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
              <Button>Bekijk deze stelling</Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
