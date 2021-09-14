import type { CheckIn, User } from '@prisma/client';

/**
 * Check in a user
 *
 * @param { uid, location } - user id and location
 * @returns CheckIn object
 */
const checkInUser = async ({
  uid,
  location,
}: {
  uid: string;
  location: string;
}) => {
  const response = await fetch(`/api/checkIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid: Number(uid),
      location,
    }),
  });

  // Handle errors
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = (await response.json()) as CheckIn & { user: User };

  return json;
};

export default checkInUser;
