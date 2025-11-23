import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUser = async (ctx: any): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity.subject;
};

export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
    parentNote: v.optional(v.id("notes")),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    console.log("userId", userId);
    let isDeleted = false;
    let isFavorite = false;

    if (args.parentNote) {
      const parentNote = await ctx.db.get(args.parentNote);
      if (!parentNote) {
        throw new Error("Note not found");
      }
      isDeleted = parentNote.isDeleted;
      isFavorite = parentNote.isFavorite;
    }

    return ctx.db.insert("notes", {
      title: args.title,
      parentNote: args.parentNote,
      userId,
      isDeleted,
      isFavorite,
    });
  },
});
export const findAllCurrentUserNotes = query({
  args: {
    parentNote: v.optional(v.id("notes")),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentNote", args.parentNote),
      )
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .order("desc")
      .collect();
    return notes;
  },
});
