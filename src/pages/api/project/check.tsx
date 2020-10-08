import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient({ log: ['query'] })
  const session = await getSession({ req })

  try {
    const actualUser = await prisma.user.findMany({
      where: {
        name: session!.user.name,
      },
    })
    const project = await prisma.project.findMany({
      where: {
        userId: actualUser[0].id,
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
