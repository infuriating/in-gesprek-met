import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import DisplayActieveStelling from "./components/DisplayActieveStelling";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getLatestThree);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );

  return (
    <DisplayActieveStelling
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
    />
  );
}
