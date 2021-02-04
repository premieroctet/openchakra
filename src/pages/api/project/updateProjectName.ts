import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function UpdateProjectName(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let ts = new Date()
  try {
    const projects = await prisma.session.findUnique({
      where: {
        accessToken: req.body.accessToken,
      },
    })

    const userProject = await prisma.project.findUnique({
      where: {
        id: req.body.id,
      },
    })
    if (userProject?.userId === projects?.userId) {
      await prisma.project.update({
        where: {
          id: req.body.id,
        },
        data: {
          projectName: req.body.projectName,
          updatedAt: ts.toISOString(),
        },
      })
      res.status(201)
      res.json({
        success: 'Update project name to database successfully !',
      })
    } else {
      res.status(500)
      res.json({ error: 'Sorry this is not your project' })
    }
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to update project name to database' })
  } finally {
    await prisma.$disconnect()
  }
}
