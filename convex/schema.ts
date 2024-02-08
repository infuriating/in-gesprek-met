import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stellingen: defineTable({
    slug: v.string(),
    stelling: v.string(),
    keuzes: v.object({
      voor: v.number(),
      tegen: v.number(),
      onbeslist: v.number(),
    }),
    door: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_stelling", ["stelling"]),

  stemmen: defineTable({
    userId: v.string(),
    stellingId: v.string(),
    keuze: v.string(),
  }).index("by_userId", ["userId"]),
});
