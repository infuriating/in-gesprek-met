import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStemmenFromStelling = query({
  args: {
    stellingId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stemmen")
      .filter((q) => q.eq(q.field("stellingId"), args.stellingId))
      .collect();
  },
});

export const addStem = mutation(
  async (
    { db },
    {
      id,
      keuze,
      keuzeOptie,
    }: {
      id: string;
      keuze: string;
      keuzeOptie: string;
    }
  ) => {
    const stelling = await db
      .query("stellingen")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();

    const stem = await db
      .query("stemmen")
      .filter((q) => q.eq(q.field("stellingId"), id))
      .first();

    if (!stelling) return;

    if (stem) {
      if (stem.keuzeOptie === keuzeOptie) {
        await db.delete(stem._id);
        stelling.keuzes[
          keuzeOptie as keyof typeof stelling.keuzes
        ].stemmen -= 1;
        await db.replace(stelling._id, stelling);
        return;
      }
      stelling.keuzes[
        stem.keuzeOptie as keyof typeof stelling.keuzes
      ].stemmen -= 1;
      await db.delete(stem._id);
    }

    stelling.keuzes[keuzeOptie as keyof typeof stelling.keuzes].stemmen += 1;

    await db.insert("stemmen", {
      stellingId: id,
      keuze,
      keuzeOptie,
    });
    await db.replace(stelling._id, stelling);
  }
);
