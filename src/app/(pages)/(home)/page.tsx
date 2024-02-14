import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import Landing from "./components/Landing";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getLatestThree);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );
  return (
    <Landing
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
    />
  );
}
