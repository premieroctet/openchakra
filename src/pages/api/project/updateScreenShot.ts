import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'

export default async function UpdateScreenshot(
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
        thumbnail: `data:image/png;base64, ${req.body.screen}`,
        updatedAt: ts.toISOString(),
      },
    })
    res.status(201)
    res.json({
      success: 'Update project screenshot to database successfully !',
    })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to update project screenshot to database' })
  } finally {
    await prisma.$disconnect()
  }
}
