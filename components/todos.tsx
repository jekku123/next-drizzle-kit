'use client';

import { Todo } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';
import AddTodo from './add-todo';
import DeleteTodo from './delete-todo';
import EditTodo from './edit-todo';
import ToggleTodo from './toggle-todo';

export type OptimisticTodoAction = (action: {
  type: 'add' | 'remove' | 'update';
  todo: Todo;
}) => void;

export default function Todos({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (
      state: Todo[],
      {
        type,
        todo,
      }: {
        type: 'add' | 'remove' | 'update';
        todo: Todo;
      }
    ) => {
      switch (type) {
        case 'add':
          return [...state, todo];
        case 'remove':
          return state.filter((t) => t.id !== todo.id);
        case 'update':
          return state.map((t) => (t.id === todo.id ? todo : t));
        default:
          return state;
      }
    }
  );

  return (
    <>
      <AddTodo todos={todos} setOptimisticTodos={setOptimisticTodos} />
      <ul className="flex flex-col items-center gap-4 mt-5">
        {optimisticTodos.at(0) ? (
          optimisticTodos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-4 border p-4 border-border rounded-md"
            >
              <ToggleTodo todo={todo} setOptimisticTodos={setOptimisticTodos} />
              <div className="w-56">
                <p className={cn('text-center', todo.completed && 'line-through')}>{todo.todo}</p>
              </div>
              <div className="flex items-center gap-2">
                <EditTodo todo={todo} setOptimisticTodos={setOptimisticTodos} />
                <DeleteTodo todo={todo} setOptimisticTodos={setOptimisticTodos} />
              </div>
            </li>
          ))
        ) : (
          <p>No todos.</p>
        )}
      </ul>
    </>
  );
}
