import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function CreateProject(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { project: projectData } = req.body
    const actualUser = await prisma.session.findMany({
      where: {
        accessToken: req.body.accessToken,
      },
    })
    const project = await prisma.project.create({
      data: {
        markup: projectData.markup,
        projectName: projectData.projectName,
        user: {
          connect: {
            id: actualUser[0].userId,
          },
        },
      },
    })
    res.status(201)
    res.json({ project })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to save project to database' })
  } finally {
    await prisma.$disconnect()
  }
}
