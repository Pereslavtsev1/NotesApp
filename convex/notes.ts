import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { AppWindowMac } from "lucide-react";

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
export const findAllUserNotes = query({
  args: {
    parentNote: v.optional(v.id("notes")),
    isFavorite: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    console.log("parentNote", args.parentNote);
    const userId = await getUser(ctx);

    let notesQuery = ctx.db
      .query("notes")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentNote", args.parentNote),
      );

    if (args.isDeleted !== undefined) {
      notesQuery = notesQuery.filter((q) =>
        q.eq(q.field("isDeleted"), args.isDeleted),
      );
    } else {
      notesQuery = notesQuery.filter((q) => q.eq(q.field("isDeleted"), false));
    }

    if (args.isFavorite !== undefined) {
      notesQuery = notesQuery.filter((q) =>
        q.eq(q.field("isFavorite"), args.isFavorite),
      );
    }

    const notes = await notesQuery.order("desc").collect();

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

export const updateNote = mutation({
  args: {
    id: v.id("notes"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
    recursive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    icon: v.optional(v.string()),
    coverImageKey: v.optional(v.string()),
    parentNote: v.optional(v.id("notes")),
  },

  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const note = await ctx.db.get(args.id);

    if (!note) throw new Error("Note not found");
    if (note.userId !== userId) throw new Error("No permission");

    const { id, recursive, parentNote, ...rest } = args;

    await ctx.db.patch(
      id,
      pickDefined({
        ...rest,
        parentNote,
      }),
    );

    if (!recursive) return;

    const updateChildren = async (parentId: Id<"notes">) => {
      const children = await ctx.db
        .query("notes")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentNote", parentId),
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(
          child._id,
          pickDefined({
            isDeleted: args.isDeleted,
            isFavorite: args.isFavorite,
            deletedAt: args.deletedAt,
          }),
        );
        await updateChildren(child._id);
      }
    };

    await updateChildren(id);
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

export const search = query({
  handler: async (ctx) => {
    const userId = await getUser(ctx);
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isDeleted"), false))
      .order("desc")
      .collect();
    return notes;
  },
});

export const deletePermanently = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const note = await ctx.db.get(args.id);

    if (!note) throw new Error("Note not found");
    if (note.userId !== userId) {
      throw new Error("No permission to delete");
    }

    await ctx.db.delete(args.id);
  },
});
export const restore = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const userId = await getUser(ctx);
    const note = await ctx.db.get(args.id);

    if (!note) throw new Error("Note not found");
    if (note.userId !== userId) {
      throw new Error("No permission to delete");
    }
    return await ctx.db.patch(args.id, {
      isDeleted: false,
    });
  },
});

const pickDefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
