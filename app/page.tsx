import AddTodo from '@/components/add-todo';
import DeleteTodo from '@/components/delete-todo';
import EditTodo from '@/components/edit-todo';
import { getTodos } from './actions';

export default async function Home() {
  const todos = await getTodos();

  if (!todos) return;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-10">Next.js Drizzle Postgres Todo App</h1>
      <AddTodo />
      <h2 className="text-xl font-bold mt-10">Todos</h2>
      <ul className="flex flex-col items-center gap-4 mt-10">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-4 border p-4 border-border rounded-md">
            <div className="w-56">
              <p className="text-center">{todo.todo}</p>
            </div>
            <div className="flex items-center gap-2">
              <EditTodo todo={todo} />
              <DeleteTodo todo={todo} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
