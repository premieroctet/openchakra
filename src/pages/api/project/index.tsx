import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] })

  try {
    const projects = await prisma.project.findMany()
    res.status(200)
    res.json({ projects })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to fetch project' })
  } finally {
    await prisma.$disconnect
  }
}
