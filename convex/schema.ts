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
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['userId', 'isDeleted'],
    })
    .index('by_user_parent', ['userId', 'parentNote'])
    .index('by_user_deleted', ['userId', 'isDeleted'])
    .index('by_user_parent_favorite_deleted', [
      'userId',
      'parentNote',
      'isDeleted',
      'isFavorite',
    ]),
});
