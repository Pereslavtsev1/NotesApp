import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import type { Id } from './_generated/dataModel';
import {
  type MutationCtx,
  type QueryCtx,
  mutation,
  query,
} from './_generated/server';

const pickDefined = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as Partial<T>;

type Ctx = MutationCtx | QueryCtx;

const getUserId = async (ctx: Ctx): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Not authenticated');
  }
  return identity.subject;
};

const getUserNoteOrThrow = async (
  ctx: Ctx,
  noteId: Id<'notes'>,
  userId: string
) => {
  const note = await ctx.db.get(noteId);

  if (!note) {
    throw new Error('Note not found');
  }

  if (note.userId !== userId) {
    throw new Error('No permission');
  }

  return note;
};

export const createNote = mutation({
  args: {
    title: v.string(),
    parentNote: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    let isDeleted = false;
    let isFavorite = false;

    if (args.parentNote) {
      const parentNote = await getUserNoteOrThrow(ctx, args.parentNote, userId);
      isDeleted = parentNote.isDeleted;
      isFavorite = parentNote.isFavorite;
    }

    return ctx.db.insert('notes', {
      title: args.title,
      parentNote: args.parentNote,
      userId,
      isDeleted,
      isFavorite,
    });
  },
});

export const findNote = query({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    return await getUserNoteOrThrow(ctx, args.id, userId);
  },
});
export const removeIcon = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    await getUserNoteOrThrow(ctx, args.id, userId);
    return await ctx.db.patch(args.id, { icon: undefined });
  },
});

export const updateNote = mutation({
  args: {
    id: v.id('notes'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    isDeleted: v.optional(v.boolean()),
    recursive: v.optional(v.boolean()),
    deletedAt: v.optional(v.number()),
    icon: v.optional(v.string()),
    coverImageKey: v.optional(v.string()),
    parentNote: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    await getUserNoteOrThrow(ctx, args.id, userId);
    const { id, recursive, parentNote, ...rest } = args;

    await ctx.db.patch(
      id,
      pickDefined({
        ...rest,
        parentNote,
      })
    );

    if (!recursive) return;

    const updateChildren = async (parentId: Id<'notes'>) => {
      const children = await ctx.db
        .query('notes')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentNote', parentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(
          child._id,
          pickDefined({
            isDeleted: args.isDeleted,
            isFavorite: args.isFavorite,
            deletedAt: args.deletedAt,
          })
        );
        await updateChildren(child._id);
      }
    };

    await updateChildren(id);
  },
});

export const duplicate = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    const note = await getUserNoteOrThrow(ctx, args.id, userId);

    const { _id, _creationTime, parentNote, ...safeFields } = note;

    return ctx.db.insert('notes', {
      ...safeFields,
      parentNote: undefined,
    });
  },
});

export const deletePermanently = mutation({
  args: {
    ids: v.array(v.id('notes')),
  },
  handler: async (ctx, { ids }) => {
    const userId = await getUserId(ctx);
    for (const id of ids) {
      await getUserNoteOrThrow(ctx, id, userId);
      await ctx.db.delete(id);
    }
  },
});

export const restoreSmart = mutation({
  args: { id: v.id('notes') },
  handler: async (ctx, { id }) => {
    const userId = await getUserId(ctx);
    const note = await getUserNoteOrThrow(ctx, id, userId);

    let parentNote = note.parentNote;

    if (parentNote) {
      const parent = await ctx.db.get(parentNote);
      if (!parent || parent.isDeleted) {
        parentNote = undefined;
      }
    }

    return ctx.db.patch(id, {
      isDeleted: false,
      parentNote,
    });
  },
});

export const removeCoverImage = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    await getUserNoteOrThrow(ctx, args.id, userId);
    return await ctx.db.patch(args.id, { coverImageKey: undefined });
  },
});

export const findAllNotes = query({
  args: {
    paginationOpts: paginationOptsValidator,
    parentNoteId: v.optional(v.string()),
    isDeleted: v.boolean(),
    isFavorite: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    if (args.isFavorite === undefined) {
      return ctx.db
        .query('notes')
        .withIndex('by_user_parent_deleted', (q) =>
          q
            .eq('userId', userId)
            .eq('parentNote', args.parentNoteId as Id<'notes'> | undefined)
            .eq('isDeleted', args.isDeleted)
        )
        .order('desc')
        .paginate(args.paginationOpts);
    }

    const isFavorite = args.isFavorite;
    return ctx.db
      .query('notes')
      .withIndex('by_user_parent_deleted_favorite', (q) =>
        q
          .eq('userId', userId)
          .eq('parentNote', args.parentNoteId as Id<'notes'> | undefined)
          .eq('isDeleted', args.isDeleted)
          .eq('isFavorite', isFavorite)
      )
      .order('desc')
      .paginate(args.paginationOpts);
  },
});

export const searchNote = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.string(),
    isDeleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query('notes')
      .withSearchIndex('search_title', (q) =>
        q.search('title', args.search).eq('isDeleted', args.isDeleted)
      )
      .paginate(args.paginationOpts);
  },
});
