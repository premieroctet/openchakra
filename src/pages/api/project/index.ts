import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'

export default async function(req: NextApiRequest, res: NextApiResponse) {
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
