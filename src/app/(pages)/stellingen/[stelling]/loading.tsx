import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div>
      <div className="py-2">
        <h2 className="text-2xl font-bold">Stelling</h2>
        <p className="text-muted-foreground">
          Stelling van{" "}
          <span className="font-bold text-secondary-foreground">
            een gebruiker
          </span>
        </p>
      </div>

      <p className="pb-4">U heeft nog niet gestemd!</p>
      <div className="grid md:grid-cols-3 gap-x-6 gap-y-2">
        <Button>Stem voor</Button>
        <Button variant={"destructive"}>Stem tegen</Button>
        <Button variant={"outline"}>Onbeslist</Button>
      </div>
      <div className="pt-4">
        <Skeleton className="h-[350px]" />
      </div>
    </div>
  );
}
