import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import ActieveStelling from "./components/ActieveStelling";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getLatestThree);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );
  return (
    <ActieveStelling
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
    />
  );
}
