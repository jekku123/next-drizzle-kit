'use client';

import { removeTodo } from '@/lib/actions';
import { Todo } from '@/lib/schema';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { OptimisticTodoAction } from './todos';
import FormButton from './ui/form-button';

type DeleteTodoProps = {
  todo: Todo;
  setOptimisticTodos: OptimisticTodoAction;
};

export default function DeleteTodo({ todo, setOptimisticTodos }: DeleteTodoProps) {
  return (
    <form
      action={async () => {
        setOptimisticTodos({
          type: 'remove',
          todo,
        });
        try {
          await removeTodo(todo.id);
          toast.success('Todo removed successfully');
        } catch (error) {
          toast.error('Failed to remove todo');
        }
      }}
    >
      <FormButton variant="outline" size="icon">
        <X />
      </FormButton>
    </form>
  );
}
