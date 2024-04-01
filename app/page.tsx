import Todos from '@/components/todos';
import { getTodos } from '../lib/actions';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-10">Next.js Drizzle Postgres Todo App</h1>
      <Todos todos={todos} />
    </main>
  );
}
