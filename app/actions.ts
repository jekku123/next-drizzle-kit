'use server';

import { db } from '@/lib';
import { todos } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

const schema = z.object({
  todo: z.string().min(1, { message: 'Todo cannot be empty' }),
});

type FormErrorFields = {
  name: string;
};
export type FormState = {
  message: string;
  status: string;
  errors: Record<keyof FormErrorFields, string> | undefined;
};

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

export async function createTodo(prevState: FormState, formData: FormData) {
  try {
    const todo = schema.parse({
      todo: formData.get('todo') as string,
    });

    await db.insert(todos).values(todo);

    revalidatePath('/');

    return {
      message: 'Todo added successfully',
      status: 'success',
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'Todo could not be added',
        status: 'error',
        errors: {
          name: errorMap['todo']?.[0] ?? '',
        },
      };
    }

    return {
      message: 'Todo could not be added due to a database error',
      status: 'error',
      errors: {
        name: 'Database insertion failed',
      },
    };
  }
}

export async function editTodo(prevState: FormState, formData: FormData) {
  const id = parseInt(formData.get('id') as string);

  try {
    const todo = schema.parse({
      todo: formData.get('todo') as string,
    });

    await db.update(todos).set(todo).where(eq(todos.id, id));

    revalidatePath('/');
    return {
      message: 'Todo edited successfully',
      status: 'success',
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'Todo could not be added',
        status: 'error',
        errors: {
          name: errorMap['todo']?.[0] ?? '',
        },
      };
    }

    return {
      message: 'Todo could not be added due to a database error',
      status: 'error',
      errors: {
        name: 'Database insertion failed',
      },
    };
  }
}

export async function removeTodo(prevState: any, formData: FormData) {
  const id = parseInt(formData.get('id') as string);

  try {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath('/');
    return {
      message: 'Todo removed successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Todo could not be removed',
    };
  }
}
