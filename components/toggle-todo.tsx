'use client';

import { toggleTodoCompleted } from '@/lib/actions';
import { Todo } from '@/lib/schema';

import { toast } from 'sonner';
import { OptimisticTodoAction } from './todos';
import FormButton from './ui/form-button';

type ToggleTodoProps = {
  todo: Todo;
  setOptimisticTodos: OptimisticTodoAction;
};

export default function ToggleTodo({ todo, setOptimisticTodos }: ToggleTodoProps) {
  return (
    <form
      action={async () => {
        setOptimisticTodos({
          type: 'update',
          todo: { ...todo, completed: !todo.completed },
        });
        try {
          await toggleTodoCompleted(todo.id);
          toast.success(`Todo status updated to ${!todo.completed ? 'completed' : 'incomplete'}`);
        } catch (error) {
          toast.error('Failed to update todo');
        }
      }}
    >
      <FormButton variant="outline" size="icon">
        {todo.completed ? '👍' : '👎'}
      </FormButton>
    </form>
  );
}
