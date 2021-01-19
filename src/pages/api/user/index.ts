import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

export default async function UserIndex(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const users = await prisma.user.findMany()
    res.status(200)
    res.json({ users })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to fetch user' })
  } finally {
    await prisma.$disconnect
  }
}
