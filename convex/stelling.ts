import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("stellingen").order("desc").collect();
  },
});

export const getLatestThree = query({
  handler: async (ctx) => {
    return await ctx.db.query("stellingen").order("desc").take(3);
  },
});

export const getStelling = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const stelling = await ctx.db
      .query("stellingen")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    return stelling;
  },
});

export const addStelling = mutation({
  args: {
    stelling: v.string(),
    keuzes: v.object({
      keuze1: v.object({ naam: v.string(), stemmen: v.float64() }),
      keuze2: v.object({ naam: v.string(), stemmen: v.float64() }),
      keuze3: v.optional(v.object({ naam: v.string(), stemmen: v.float64() })),
      keuze4: v.optional(v.object({ naam: v.string(), stemmen: v.float64() })),
    }),
    door: v.string(),
  },
  handler: async (ctx, args) => {
    const stelling = await ctx.db.insert("stellingen", {
      slug: args.stelling
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace(/ /g, "-"),
      door: args.door,
      keuzes: args.keuzes,
      stelling: args.stelling,
    });

    return stelling;
  },
});

export const updateStelling = mutation(
  async (
    { db },
    {
      id,
      stelling,
      keuzes,
    }: {
      id: string;
      stelling: string;
      keuzes: {
        keuze1: { naam: string; stemmen: number };
        keuze2: { naam: string; stemmen: number };
        keuze3?: { naam: string; stemmen: number };
        keuze4?: { naam: string; stemmen: number };
      };
    }
  ) => {
    const document = await db
      .query("stellingen")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();

    if (!document) return;

    await db.replace(document._id, {
      ...document,
      slug: stelling
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "")
        .replace("/ /g", "-"),
      keuzes: {
        keuze1: {
          naam: keuzes.keuze1.naam,
          stemmen: document.keuzes.keuze1.stemmen,
        },
        keuze2: {
          naam: keuzes.keuze2.naam,
          stemmen: document.keuzes.keuze2.stemmen,
        },
        keuze3: keuzes.keuze3
          ? {
              naam: keuzes.keuze3.naam,
              stemmen: document.keuzes.keuze3.stemmen,
            }
          : undefined,
        keuze4: keuzes.keuze4
          ? {
              naam: keuzes.keuze4.naam,
              stemmen: document.keuzes.keuze4.stemmen,
            }
          : undefined,
      },
      stelling: stelling,
    });
  }
);

export const deleteStelling = mutation(
  async ({ db }, { id }: { id: string }) => {
    const document = await db
      .query("stellingen")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();

    const stemmen = await db
      .query("stemmen")
      .filter((q) => q.eq(q.field("stellingId"), id))
      .collect();

    if (!document) return;

    await db.delete(document._id);
    await Promise.all(stemmen.map((stem) => db.delete(stem._id)));
  }
);
