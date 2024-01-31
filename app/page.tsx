import FormButton from '@/components/ui/form-button';
import { Input } from '@/components/ui/input';
import { addTodo, getTodos, removeTodo } from './actions';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2 className="text-2xl font-bold">Next.js Drizzle Todo</h2>
      <form action={addTodo}>
        <div className="flex mt-5">
          <Input type="text" name="todo" placeholder="Add todo" />
          <FormButton>Add todo</FormButton>
        </div>
      </form>
      <ul className="flex flex-col items-center mt-10">
        {todos &&
          todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-4">
              <p>{todo.todo}</p>
              <form action={removeTodo}>
                <Input type="hidden" name="id" value={todo.id} />
                <FormButton>Remove Todo</FormButton>
              </form>
            </li>
          ))}
      </ul>
    </main>
  );
}
