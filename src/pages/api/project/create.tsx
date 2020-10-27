import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()
  const session = await getSession({ req })
  try {
    const { project: projectData } = req.body
    const actualUser = await prisma.session.findMany({
      where: {
        accessToken: session!.accessToken,
      },
    })
    console.log(actualUser)
    const project = await prisma.project.create({
      data: {
        markup: projectData.markup,
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
