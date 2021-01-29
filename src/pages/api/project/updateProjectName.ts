import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function UpdateProjectName(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let ts = new Date()
  try {
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
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to update project name to database' })
  } finally {
    await prisma.$disconnect()
  }
}
