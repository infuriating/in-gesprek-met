import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import ActieveStelling from "./components/ActieveStelling";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );

  // const user = await currentUser();
  // if (!user) {
  //   return (
  //     <div className="flex flex-col items-center gap-y-1">
  //       <h1 className="text-4xl font-bold">Je bent niet ingelogd</h1>
  //       <p className="text-muted-foreground">
  //         Log in om op de actieve stelling te stemmen
  //       </p>
  //       <div className="mt-2">
  //         <SignInButton>
  //           <Button className="w-full">Log in</Button>
  //         </SignInButton>
  //         <SignUpButton>
  //           <Button variant={"link"} className="text-white w-full flex gap-x-2">
  //             <span className="text-muted-foreground">Nog geen account?</span>
  //             Maak hier een account aan
  //           </Button>
  //         </SignUpButton>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <ActieveStelling
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
      // user={JSON.parse(JSON.stringify(user))}
    />
  );
}
