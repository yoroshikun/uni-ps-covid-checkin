import type { NextApiRequest, NextApiResponse } from 'next';
import type { CheckIn } from '@prisma/client';
import prisma from '../../lib/prisma';

/**
 * Get all check ins by location
 *
 * @param req - { locationId: string }
 * @param res - response object
 *
 * @returns CheckIns
 */
const getCheckInsByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse<CheckIn[]>
) => {
  const { locationId } = req.body as { locationId: string };

  const checkIns = await prisma.checkIn.findMany({
    where: { locationId },
    include: { user: true, location: true },
  });

  return res.status(200).json(checkIns);
};

export default getCheckInsByUserId;
