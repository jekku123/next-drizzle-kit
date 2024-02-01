import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  todo: text('todo').notNull(),
  completed: boolean('completed').notNull().default(false),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
