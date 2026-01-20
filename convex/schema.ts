import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    userId: v.string(),
    parentNote: v.optional(v.id('notes')),
    content: v.optional(v.string()),
    isFavorite: v.boolean(),
    isDeleted: v.boolean(),
    coverImageKey: v.optional(v.string()),
    icon: v.optional(v.string()),
    deletedAt: v.optional(v.number()),
  })
    .index('by_user_parent', ['userId', 'parentNote'])
    .index('by_user_parent_deleted', ['userId', 'parentNote', 'isDeleted'])
    .index('by_user_parent_deleted_favorite', [
      'userId',
      'parentNote',
      'isDeleted',
      'isFavorite',
    ])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['isDeleted'],
    }),
});
