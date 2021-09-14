import type { CheckIn, Location, User } from '@prisma/client';
import makeAPIURL from './makeAPIURL';

/**
 * Fetch all check-ins
 *
 * @param { userId: string }
 * @returns User object
 */
const fetchAllCheckIns = async () => {
  const response = await fetch(`${makeAPIURL()}/api/getCheckIns`, {
    method: 'GET',
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

export default fetchAllCheckIns;
