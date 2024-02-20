'use server';

import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';
import {
  deleteTodoById,
  getAllTodos,
  getTodoById,
  insertTodo,
  toggleTodoCompletedById,
  updateTodoById,
} from './data-access';

const schema = z.object({
  todo: z.string().min(1, { message: 'Todo cannot be empty' }),
});

export type FormState = {
  message: string;
  error: string | undefined;
};

export async function getTodos() {
  try {
    const res = await getAllTodos();
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTodo(prevState: FormState, formData: FormData) {
  try {
    const todo = schema.parse({
      todo: formData.get('todo') as string,
    });

    await insertTodo(todo);

    revalidatePath('/');

    return {
      message: 'success',
      error: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'error',
        error: errorMap['todo']?.[0] ?? '',
      };
    }

    return {
      message: 'error',
      error: 'Database insertion failed',
    };
  }
}

export async function updateTodo(id: number, prevState: FormState, formData: FormData) {
  try {
    const todo = schema.parse({
      todo: formData.get('todo') as string,
    });

    await updateTodoById(id, todo);

    revalidatePath('/');

    return {
      message: 'success',
      error: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'error',
        error: errorMap['todo']?.[0] ?? '',
      };
    }

    return {
      message: 'error',
      error: 'Database insertion failed',
    };
  }
}

export async function removeTodo(id: number) {
  try {
    await deleteTodoById(id);
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
}

export async function toggleTodoCompleted(id: number) {
  try {
    const todo = await getTodoById(id);
    if (!todo) return;
    await toggleTodoCompletedById(id, todo);
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
}
