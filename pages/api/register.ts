import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface Input {
  name: string;
  email?: string;
  phone?: string;
}

/**
 * Register a new user
 *
 * @param req - { name, email, phone }
 * @param res - response object
 *
 * @returns User
 */
const checkIn = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, phone } = req.body as Input;

    // Generate new id for user using length of current users
    const uid = (await prisma.user.count()) + 1;

    const checkIn = await prisma.user.create({
      data: { uid, name, email, phone },
    });

    res.status(201).json(checkIn);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default checkIn;
