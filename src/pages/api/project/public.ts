import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function PublicProject(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const project = await prisma.project.findMany({
      include: { user: true },
      where: {
        public: true,
        validated: true,
      },
    })

    res.status(201)
    res.json({ project })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to fetch public project' })
  } finally {
    await prisma.$disconnect()
  }
}
