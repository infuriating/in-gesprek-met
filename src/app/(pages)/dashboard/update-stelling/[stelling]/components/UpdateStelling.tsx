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
  const [formData, setFormData] = useState({
    // @ts-expect-error stelling is possibly "null"
    stelling: stelling.stelling,
    keuzes: {
      keuze1: {
        naam: stelling?.keuzes.keuze1.naam,
        stemmen: stelling?.keuzes.keuze1.stemmen,
      },
      keuze2: {
        naam: stelling?.keuzes.keuze2.naam,
        stemmen: stelling?.keuzes.keuze2.stemmen,
      },
      keuze3: {
        naam: stelling?.keuzes.keuze3.naam,
        stemmen: stelling?.keuzes.keuze3.stemmen,
      },
      keuze4: {
        naam: stelling?.keuzes.keuze4.naam,
        stemmen: stelling?.keuzes.keuze4.stemmen,
      },
    },
  });
  const router = useRouter();
  const { user } = useUser();
  if (!user) return;
  if (!stelling) return;

  const handleMutation = (e: any) => {
    e.preventDefault();

    updateMutation({
      id: stelling._id,
      stelling: formData.stelling,
      keuzes: formData.keuzes,
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
              <Label htmlFor="keuzes">Keuzes</Label>
              <Input
                required
                name="keuzes"
                value={formData.keuzes.keuze1.naam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keuzes: {
                      ...formData.keuzes,
                      keuze1: {
                        naam: e.target.value,
                        stemmen: 0,
                      },
                    },
                  })
                }
              />
              <Input
                required
                name="keuzes"
                value={formData.keuzes.keuze2.naam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keuzes: {
                      ...formData.keuzes,
                      keuze2: {
                        naam: e.target.value,
                        stemmen: 0,
                      },
                    },
                  })
                }
              />
              <p className="pt-2 text-xs text-muted-foreground">
                (optionele keuzes)
              </p>
              <Input
                name="keuzes"
                value={formData.keuzes.keuze3.naam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keuzes: {
                      ...formData.keuzes,
                      keuze3: {
                        naam: e.target.value,
                        stemmen: 0,
                      },
                    },
                  })
                }
              />
              <Input
                name="keuzes"
                value={formData.keuzes.keuze4.naam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    keuzes: {
                      ...formData.keuzes,
                      keuze4: {
                        naam: e.target.value,
                        stemmen: 0,
                      },
                    },
                  })
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
