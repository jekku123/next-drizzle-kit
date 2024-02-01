'use client';

import { removeTodo } from '@/app/actions';
import { Todo } from '@/lib/schema';
import { X } from 'lucide-react';
import FormButton from './ui/form-button';

export default function DeleteTodo({ todo }: { todo: Todo }) {
  return (
    <form action={removeTodo.bind(null, todo.id)}>
      <FormButton variant="outline" size="icon">
        <X />
      </FormButton>
    </form>
  );
}
