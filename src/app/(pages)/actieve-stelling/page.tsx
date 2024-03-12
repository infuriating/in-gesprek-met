import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import ActieveStelling from "./components/ActieveStelling";

export default async function Wrapper() {
  const preloadedStellingen = await preloadQuery(api.stelling.getAll);
  const actieveStelling = await preloadQuery(
    api.actieveStelling.getActieveStelling
  );

  const allCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomId = Array(12)
    .fill(0)
    .map(() =>
      allCharacters.charAt(Math.floor(Math.random() * allCharacters.length))
    )
    .join("");

  return (
    <ActieveStelling
      randomId={randomId}
      preloadedStellingen={preloadedStellingen}
      actieveStelling={actieveStelling}
    />
  );
}
