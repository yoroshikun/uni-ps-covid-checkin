import type { User } from '@prisma/client';

/**
 * Register a new user
 *
 * @param { name: string, email: string, password: string }
 * @returns User object
 */
const registerUser = async ({
  name,
  phone,
  email,
}: {
  name: string;
  phone?: string;
  email?: string;
}) => {
  const response = await fetch(`/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      phone,
      email,
    }),
  });

  // Handle errors
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as User;

  return json;
};

export default registerUser;
