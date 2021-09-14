import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface Input {
  uid: number;
  location: string;
}

/**
 * Creates a new checkIn item taking the user's uid and location
 *
 * @param req - {uid, location}
 * @param res - response object
 *
 * @returns CheckIn
 */
const checkIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, location } = req.body as Input;

    const checkIn = await prisma.checkIn.create({
      data: {
        user: { connect: { uid } },
        location: { connect: { name: location } },
      },
      include: { user: true },
    });

    res.status(201).json(checkIn);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default checkIn;
