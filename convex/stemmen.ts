import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

type Keuze = "voor" | "tegen" | "onbeslist";

export const getStem = query({
  args: {
    userId: v.string(),
    stellingId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stemmen")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("stellingId"), args.stellingId))
      .first();
  },
});

export const addStem = mutation(
  async (
    { db },
    {
      userId,
      id,
      keuze,
    }: {
      userId: string;
      id: string;
      keuze: string;
    }
  ) => {
    const stelling = await db
      .query("stellingen")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();

    const stem = await db
      .query("stemmen")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("stellingId"), id))
      .first();

    console.log(userId);

    console.log("before", stelling);
    if (!stelling) return;

    if (stem) {
      if (stem.keuze === keuze) {
        await db.delete(stem._id);
        stelling.keuzes[keuze as keyof typeof stelling.keuzes] -= 1;
        await db.replace(stelling._id, stelling);
        return;
      }
      stelling.keuzes[stem.keuze as keyof typeof stelling.keuzes] -= 1;
      await db.delete(stem._id);
    }

    stelling.keuzes[keuze as keyof typeof stelling.keuzes] += 1;
    console.log("after", stelling);

    await db.insert("stemmen", {
      userId,
      stellingId: id,
      keuze,
    });
    await db.replace(stelling._id, stelling);
  }
);
