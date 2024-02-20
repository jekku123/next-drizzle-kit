'use client';

import { createTodo } from '@/lib/actions';
import { useFormState } from 'react-dom';
import FormButton from './ui/form-button';
import { Input } from './ui/input';

const initialState = {
  message: '',
  error: undefined,
};

export default function AddTodo() {
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form action={formAction}>
      <div className="flex items-center gap-4">
        <Input placeholder="Todo.." name="todo" />
        {state?.error && <span className="text-red-500">{state?.error}</span>}
        <FormButton>Add</FormButton>
      </div>
    </form>
  );
}
