import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import LatestThreeStellingen from "./components/LatestThreeStellingen";

export default async function ArtistsWrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getLatestThree);
  return <LatestThreeStellingen preloadedStellingen={preloadedStellingen} />;
}
