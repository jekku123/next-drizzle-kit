'use client';

import { createTodo } from '@/lib/actions';
import { Todo } from '@/lib/schema';
import { useEffect, useRef } from 'react';

import { useFormState } from 'react-dom';

import { toast } from 'sonner';
import { OptimisticTodoAction } from './todos';
import FormButton from './ui/form-button';
import { Input } from './ui/input';

const initialState = {
  message: '',
  error: undefined,
};

type AddTodoProps = {
  todos: Todo[];
  setOptimisticTodos: OptimisticTodoAction;
};

export default function AddTodo({ todos, setOptimisticTodos }: AddTodoProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createTodo, initialState);

  useEffect(() => {
    if (state?.message === 'success') {
      formRef.current?.reset();
      toast.success('Todo added successfully');
    }
  }, [state]);

  return (
    <div>
      <form
        ref={formRef}
        action={async (formData: FormData) => {
          const todo = formData.get('todo') as string;
          setOptimisticTodos({ type: 'add', todo: { id: Math.random(), todo, completed: false } });
          formAction(formData);
        }}
      >
        <div className="flex items-center gap-4">
          <Input className="w-56" placeholder="Todo.." name="todo" />
          {state?.error && <span className="text-red-500">{state?.error}</span>}
          <FormButton>Add</FormButton>
        </div>
      </form>
    </div>
  );
}
