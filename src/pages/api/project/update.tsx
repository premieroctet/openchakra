import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const puppeteer = require('puppeteer')

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()
  let ts = new Date()
  try {
    const { project: projectData } = req.body

    const href = `http://localhost:3000/project/preview/${projectData.id}-${projectData.projectName}`

    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    })
    const page = await browser.newPage()
    await page.goto(href, {
      waitUntil: 'domcontentloaded',
    })
    await page.screenshot({
      fullPage: true,
    })
    const b64string: string = (await page.screenshot({
      encoding: 'base64',
    })) as string
    const actualProject = await prisma.project.update({
      where: {
        id: projectData.id,
      },
      data: {
        markup: projectData.markup,
        public: projectData.public,
        thumbnail: `data:image/png;base64, ${b64string}`,
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
