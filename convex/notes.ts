import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
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
export const findAllUserWorkspaces = query({
  args: {
    parentNote: v.optional(v.id("notes")),
  },
  handler: async (ctx, args) => {
    console.log("parentNote", args.parentNote);
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

export const findNote = query({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    const userId = await getUser(ctx);
    if (!note) {
      throw new Error("Note not found");
    }
    if (note.userId !== userId) {
      throw new Error("You do not have permission to view this note");
    }
    return note;
  },
});

export const update = mutation({
  args: {
    id: v.id("notes"),
    content: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
    title: v.optional(v.string()),
    coverImageKey: v.optional(v.string()),
    parentNote: v.optional(v.id("notes")),
    recursive: v.optional(v.boolean()),
    icon: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new Error("Note not found");
    }
    if (note.userId !== userId) {
      throw new Error("You do not have permission to update this note");
    }

    const { id, recursive, ...fields } = args;
    const recursiveUpdate = async (parentNoteId: Id<"notes">) => {
      const children = await ctx.db
        .query("notes")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentNote", parentNoteId),
        )
        .collect();
      await Promise.all(
        children.map(async (child) => {
          await ctx.db.patch(child._id, {
            parentNote: args.parentNote,
            ...fields,
          });
          await recursiveUpdate(child._id);
        }),
      );
    };
    if (recursive) {
      await recursiveUpdate(id);
    }
    return await ctx.db.patch(id, { ...fields });
  },
});

export const duplicate = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);

    const note = await ctx.db.get(args.id);
    if (!note) throw new Error("Note not found");

    if (note.userId !== userId) {
      throw new Error("You do not have permission to duplicate this note");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, _creationTime, parentNote, ...safeFields } = note;

    return ctx.db.insert("notes", {
      ...safeFields,
      parentNote: undefined,
    });
  },
});

export const findRootNotes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("parentNote"), undefined))
      .collect();
  },
});
