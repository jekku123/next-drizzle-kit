import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  todo: text('todo'),
});

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
