import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stellingen: defineTable({
    slug: v.string(),
    stelling: v.string(),
    keuzes: v.union(v.object({}), v.any()),
    door: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_stelling", ["stelling"]),

  stemmen: defineTable({
    userId: v.string(),
    stellingId: v.string(),
    keuze: v.string(),
    keuzeOptie: v.string(),
  }).index("by_userId", ["userId"]),

  actieveStelling: defineTable({
    stellingSlug: v.string(),
  }),
});
