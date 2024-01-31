'use server';

import { db } from '@/lib';
import { NewTodo, todos } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
  try {
    const res = await db.query.todos.findMany();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodoById(id: number) {
  try {
    const res = await db.query.todos.findFirst({
      where: eq(todos.id, id),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function addTodo(formData: FormData) {
  const todo: NewTodo = {
    todo: formData.get('todo') as string,
  };

  try {
    const res = await db.insert(todos).values(todo).returning();
    revalidatePath('/');
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function removeTodo(formData: FormData) {
  const id = parseInt(formData.get('id') as string);

  try {
    const res = await db.delete(todos).where(eq(todos.id, id)).returning();
    revalidatePath('/');
    return res;
  } catch (error) {
    console.log(error);
  }
}
