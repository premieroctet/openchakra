import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function UpdateProject(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let ts = new Date()
  try {
    const { project: projectData } = req.body

    const projects = await prisma.session.findUnique({
      where: {
        accessToken: projectData.accessToken,
      },
    })

    const userProject = await prisma.project.findUnique({
      where: {
        id: projectData.id,
      },
    })

    if (userProject?.userId === projects?.userId) {
      await prisma.project.update({
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
      res.json({
        success: 'Update project to database successfully !',
      })
    } else {
      res.status(500)
      res.json({ error: 'Sorry this is not your project' })
    }
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to update project to database' })
  } finally {
    await prisma.$disconnect()
  }
}
