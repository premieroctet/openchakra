import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] })

  try {
    const { project: projectData } = req.body
    const project = await prisma.project.create({
      data: {
        markup: projectData.markup,
        user: projectData.user,
      },
    })

    res.status(201)
    res.json({ project })
  } catch (e) {
    console.error(e)
    res.status(500)
    res.json({ error: 'Sorry unable to save project to database' })
  } finally {
    await prisma.$disconnect()
  }
}
