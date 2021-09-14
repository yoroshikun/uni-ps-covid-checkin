import type { NextApiRequest, NextApiResponse } from 'next';
import type { CheckIn } from '@prisma/client';
import prisma from '../../lib/prisma';

/**
 * Get all check ins by user id
 *
 * @param req - { userId: string }
 * @param res - response object
 *
 * @returns CheckIns
 */
const getCheckInsByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse<CheckIn[]>
) => {
  const { userId } = req.body as { userId: string };

  const checkIns = await prisma.checkIn.findMany({
    where: { userId },
    include: { user: true, location: true },
  });

  return res.status(200).json(checkIns);
};

export default getCheckInsByUserId;
