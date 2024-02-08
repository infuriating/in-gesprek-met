"use client";

import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddStellingForm() {
  const addMutation = useMutation(api.stelling.addStelling);
  const [formData, setFormData] = useState({
    stelling: "",
    door: "",
  });
  const router = useRouter();
  const { user } = useUser();
  if (!user) return;

  const handleMutation = (e: any) => {
    e.preventDefault();

    if (formData.stelling.length < 10) {
      toast.error("Stelling moet minimaal 10 karakters bevatten");
      return;
    }

    if (formData.stelling.length > 40) {
      toast.error("Stelling mag maximaal 40 karakters bevatten");
      return;
    }

    addMutation({
      stelling: formData.stelling,
      keuzes: {
        voor: 0,
        tegen: 0,
        onbeslist: 0,
      },
      door: user.username ?? "een gebruiker",
    });
    toast.success(`Stelling ${formData.stelling} toegevoegd!`);
    router.push("/stellingen");
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Voeg een stelling toe</CardTitle>
        <CardDescription>
          Voeg een nieuwe stelling toe aan de database
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formData.stelling.length > 0 && (
          <div className="text-sm pb-4 font-muted-foreground">
            <p>Uw stelling bevat {formData.stelling.length}/40 karakters</p>
          </div>
        )}

        <form onSubmit={handleMutation}>
          <div className="flex flex-col gap-y-2">
            <div>
              <Label htmlFor="stelling">Stelling</Label>
              <Input
                name="stelling"
                onChange={(e) =>
                  setFormData({ ...formData, stelling: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="door">Door</Label>
              <Input
                name="door"
                value={user.username ?? "een gebruiker"}
                disabled
              />
            </div>
          </div>
          <Button
            className="mt-4"
            type="submit"
            disabled={
              formData.stelling.length < 10 || formData.stelling.length > 40
            }
          >
            Voeg uw stelling toe
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
