'use server';

import { db } from '@/lib';
import { NewTodo, Todo, todos } from '@/lib/schema';
import { asc, eq } from 'drizzle-orm';

export async function getAllTodos(): Promise<Todo[]> {
  return await db.query.todos.findMany({
    orderBy: [asc(todos.id)],
  });
}

export async function getTodoById(id: number) {
  return await db.query.todos.findFirst({
    where: eq(todos.id, id),
  });
}

export async function insertTodo(todo: NewTodo) {
  await db.insert(todos).values(todo);
}

export async function updateTodoById(id: number, todo: { todo: string }) {
  await db.update(todos).set(todo).where(eq(todos.id, id));
}

export async function deleteTodoById(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
}

export async function toggleTodoCompletedById(id: number, todo: Todo) {
  await db
    .update(todos)
    .set({
      completed: !todo.completed,
    })
    .where(eq(todos.id, id));
}
