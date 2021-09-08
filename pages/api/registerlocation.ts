import type { NextApiRequest, NextApiResponse } from 'next';
import type { Location } from '@prisma/client';
import prisma from '../../lib/prisma';

interface Input {
  name: string;
}

/**
 * Creates a new checkIn item taking the user's uid and location
 *
 * @param req - { name: name of the location }
 * @param res - response object
 *
 * @returns CheckIn
 */
const checkIn = async (
  req: NextApiRequest,
  res: NextApiResponse<Location | { error: string }>
) => {
  try {
    const { name } = req.body as Input;

    const location = await prisma.location.create({
      data: { name },
    });

    res.status(201).json(location);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default checkIn;
