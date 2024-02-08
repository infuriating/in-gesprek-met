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
      voor: v.number(),
      tegen: v.number(),
      onbeslist: v.number(),
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
      door,
    }: {
      id: string;
      stelling: string;
      door: string;
    }
  ) => {
    const document = await db
      .query("stellingen")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();

    if (!document) return;

    await db.replace(document._id, {
      ...document,
      stelling,
      door,
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
