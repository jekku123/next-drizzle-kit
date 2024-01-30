import { getUsers } from './actions';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold">Next.js Drizzle Kit</h2>
      <ul className="flex flex-col items-center">
        {users &&
          users.map((user) => (
            <li key={user.id} className="flex flex-col items-center">
              <p>{user.fullName}</p>
              <p>{user.phone}</p>
            </li>
          ))}
      </ul>
    </main>
  );
}
