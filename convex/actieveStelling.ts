import { query, mutation } from "./_generated/server";

export const getActieveStelling = query(async ({ db }) => {
  return await db.query("actieveStelling").first();
});

export const setActiveStelling = mutation(
  async ({ db }, { stellingSlug }: { stellingSlug: string }) => {
    const actieveStelling = await db.query("actieveStelling").first();

    if (actieveStelling) {
      await db.replace(actieveStelling._id, { stellingSlug });
    } else {
      await db.insert("actieveStelling", { stellingSlug });
    }
  }
);

export const deleteActieveStelling = mutation(
  async ({ db }, { id }: { id: string }) => {
    const document = await db.query("actieveStelling").first();
    if (!document) return;

    await db.delete(document._id);
  }
);
