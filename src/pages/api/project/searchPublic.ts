import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'
import { User, Project } from '@prisma/client'

export default async function SearchPublic(
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

    let response: (Project & { user: User }) | string | null =
      'This project was not public'

    if (project!.public) {
      response = project
    }

    res.status(201)
    res.json({ project: response })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to fetch project public by this id' })
  } finally {
    await prisma.$disconnect()
  }
}
