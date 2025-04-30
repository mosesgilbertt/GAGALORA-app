'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleLogout() {
  const cookiesStore = await cookies();
  cookiesStore.delete('Authorization');
  redirect('/');
}
