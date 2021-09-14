import type { NextApiRequest, NextApiResponse } from 'next';
import type { CheckIn } from '@prisma/client';
import prisma from '../../lib/prisma';

/**
 * Get all check ins
 *
 * @param req - request object
 * @param res - response object
 *
 * @returns CheckIns
 */
const getCheckIns = async (
  req: NextApiRequest,
  res: NextApiResponse<CheckIn[]>
) => {
  const checkIns = await prisma.checkIn.findMany({
    include: { user: true, location: true },
  });

  return res.status(200).json(checkIns);
};

export default getCheckIns;
