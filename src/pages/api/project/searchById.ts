import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function PublicProject(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const project = await prisma.project.findUnique({
      include: { user: true },
      where: {
        id: Number(req.body.projectId),
      },
    })

    res.status(201)
    res.json({ project })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to fetch project by this id' })
  } finally {
    await prisma.$disconnect()
  }
}
