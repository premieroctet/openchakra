import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  try {
    const actualUser = await prisma.session.findMany({
      where: {
        accessToken: req.body.accessToken,
      },
    })
    const project = await prisma.project.findMany({
      where: {
        userId: actualUser[0].userId,
      },
    })
    res.status(201)
    res.json({ project })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to check project to database' })
  } finally {
    await prisma.$disconnect()
  }
}
