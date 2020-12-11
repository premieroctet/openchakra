import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  let ts = new Date()

  try {
    const { project: projectData } = req.body
    const actualProject = await prisma.project.update({
      where: {
        id: projectData.id,
      },
      data: {
        markup: projectData.markup,
        public: projectData.public,
        updatedAt: ts.toISOString(),
      },
    })
    res.status(201)
    res.json({ actualProject })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to update project to database' })
  } finally {
    await prisma.$disconnect()
  }
}
