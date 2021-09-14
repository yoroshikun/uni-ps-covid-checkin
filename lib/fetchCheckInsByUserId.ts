import type { CheckIn, Location, User } from '@prisma/client';

/**
 * Fetch check ins by user id
 *
 * @param { userId: string }
 * @returns User object
 */
const fetchCheckInsByUserId = async ({ userId }: { userId: string }) => {
  const response = await fetch(`/api/getCheckInsByUserId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
    }),
  });

  // Handle errors
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as (CheckIn & {
    user: User;
    location: Location;
  })[];

  return json;
};

export default fetchCheckInsByUserId;
