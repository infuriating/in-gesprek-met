import { api } from "../../../../../../../convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdateStelling(params: {
  preloadedStelling: Preloaded<typeof api.stelling.getStelling>;
}) {
  const stelling = usePreloadedQuery(params.preloadedStelling);
  const updateMutation = useMutation(api.stelling.updateStelling);
  // @ts-expect-error stelling is possibly "null"
  const [formData, setFormData] = useState({ stelling: stelling.stelling });
  const router = useRouter();
  const { user } = useUser();
  if (!user) return;
  if (!stelling) return;

  const handleMutation = (e: any) => {
    e.preventDefault();

    updateMutation({
      id: stelling._id,
      stelling: formData.stelling,
    });
    toast.success(`Stelling ${formData.stelling} is bewerkt!`);
    router.push("/dashboard");
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Pas een stelling</CardTitle>
        <CardDescription>
          Pas een bestaande stelling uit de database aan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formData.stelling.length > 0 && (
          <div className="text-sm pb-4 font-muted-foreground">
            <p>Uw stelling bevat {formData.stelling.length}/40 karakters</p>
          </div>
        )}

        <form onSubmit={(e) => handleMutation(e)}>
          <div className="flex flex-col gap-y-2">
            <div>
              <Label htmlFor="stelling">Stelling</Label>
              <Input
                name="stelling"
                value={formData.stelling}
                onChange={(e) =>
                  setFormData({ ...formData, stelling: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="door">Door</Label>
              <Input name="door" value={stelling.door} disabled />
            </div>
          </div>
          <Button
            className="mt-4"
            type="submit"
            disabled={
              formData.stelling.length < 10 || formData.stelling.length > 40
            }
          >
            Pas deze stelling aan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
