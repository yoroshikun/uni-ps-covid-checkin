import type { CheckIn, Location, User } from '@prisma/client';

/**
 * Fetch check ins by location id
 *
 * @param { userId: string }
 * @returns User object
 */
const fetchCheckInsByLocationId = async ({
  locationId,
}: {
  locationId: string;
}) => {
  const response = await fetch(`/api/getCheckInsByLocationId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      locationId,
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

export default fetchCheckInsByLocationId;
