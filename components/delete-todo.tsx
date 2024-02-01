'use client';

import { removeTodo } from '@/app/actions';
import { Todo } from '@/lib/schema';
import { X } from 'lucide-react';
import { useFormState } from 'react-dom';
import FormButton from './ui/form-button';
import { Input } from './ui/input';

const initialState = {
  message: '',
};

export default function DeleteTodo({ todo }: { todo: Todo }) {
  const [state, formAction] = useFormState(removeTodo, initialState);

  return (
    <form action={formAction}>
      <Input type="hidden" name="id" value={todo.id} />
      <FormButton variant="outline" size="icon">
        <X />
      </FormButton>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
