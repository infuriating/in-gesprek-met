import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import Landing from "./components/Landing";
import { currentUser } from "@clerk/nextjs/server";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );

  const user = await currentUser();

  return (
    <Landing
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
}
