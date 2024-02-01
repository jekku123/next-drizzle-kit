'use server';

import { db } from '@/lib';
import { todos } from '@/lib/schema';
import { asc, eq } from 'drizzle-orm';
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
  errors: Record<keyof FormErrorFields, string> | undefined;
};

export async function getTodos() {
  try {
    const res = await db.query.todos.findMany({
      orderBy: [asc(todos.id)],
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
      message: 'success',
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'error',
        errors: {
          name: errorMap['todo']?.[0] ?? '',
        },
      };
    }

    return {
      message: 'error',
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
      message: 'success',
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const errorMap = zodError.flatten().fieldErrors;

      return {
        message: 'error',
        errors: {
          name: errorMap['todo']?.[0] ?? '',
        },
      };
    }

    return {
      message: 'error',
      errors: {
        name: 'Database insertion failed',
      },
    };
  }
}

export async function removeTodo(id: number) {
  try {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}

export async function toggleTodoCompleted(id: number) {
  try {
    const todo = await db.query.todos.findFirst({
      where: eq(todos.id, id),
    });

    await db
      .update(todos)
      .set({
        completed: !todo?.completed,
      })
      .where(eq(todos.id, id));

    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}
