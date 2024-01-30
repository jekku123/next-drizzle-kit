'use server';

import { db } from '@/lib';
import { NewUser, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function getUsers() {
  try {
    const res = await db.query.users.findMany();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(id: number) {
  try {
    const res = await db.query.users.findMany({
      where: eq(users.id, id),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(user: NewUser) {
  try {
    const res = await db.insert(users).values(user).returning();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function removeUser(id: number) {
  try {
    const res = await db.delete(users).where(eq(users.id, id)).returning();
    return res;
  } catch (error) {
    console.log(error);
  }
}
