import type { NextApiRequest, NextApiResponse } from 'next';
import type { Location } from '@prisma/client';
import prisma from '../../lib/prisma';

/**
 * Get all locations from database
 *
 * @param req - request object
 * @param res - response object
 *
 * @returns Location
 */
const checkIn = async (
  _: NextApiRequest,
  res: NextApiResponse<Location[] | { error: String }>
) => {
  try {
    const locations = await prisma.location.findMany();

    res.status(200).json(locations);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default checkIn;
