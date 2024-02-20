'use client';

import { toggleTodoCompleted } from '@/lib/actions';
import { Todo } from '@/lib/schema';
import FormButton from './ui/form-button';

export default function ToggleTodoComplete({ todo }: { todo: Todo }) {
  return (
    <form action={toggleTodoCompleted.bind(null, todo.id)}>
      <FormButton variant="outline" size="icon">
        {todo.completed ? '👍' : '👎'}
      </FormButton>
    </form>
  );
}
