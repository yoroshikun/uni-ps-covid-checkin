import { CheckIn, Location, User } from '.prisma/client';

export type searchTypes =
  | 'uid'
  | 'userId'
  | 'username'
  | 'location'
  | 'locationId';

export type fullCheckIn = CheckIn & { user: User; location: Location };
