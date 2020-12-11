import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
const chromium = require('chrome-aws-lambda')

export default async function(req: NextApiRequest, res: NextApiResponse) {
  let ts = new Date()
  try {
    const project = await prisma.project.findMany({
      include: { user: true },
      where: {
        id: req.body,
      },
    })

    let result = null
    let browser: any = null
    let href = ''
    let screen = null

    const screenShot = async () => {
      try {
        browser = await chromium.puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: false,
          ignoreHTTPSErrors: true,
        })
        let page = await browser.newPage()
        await page.goto(href)
        await page.screenshot({
          fullPage: true,
        })
        result = (await page.screenshot({
          encoding: 'base64',
        })) as string
      } catch (error) {
        return console.log(error)
      } finally {
        if (browser !== null) {
          await browser.close()
        }
      }
      return result
    }

    href = `${process.env.DEPLOY_URL}/project/preview/${project[0].id}-${project[0].projectName}`
    if (project[0].validated) {
      screen = await screenShot()
      await prisma.project.update({
        where: {
          id: project[0].id,
        },
        data: {
          thumbnail: `data:image/png;base64, ${screen}`,
          updatedAt: ts.toISOString(),
        },
      })
    }
    res.status(201)
    res.json({ success: 'Thumbnails are succesfully created' })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to create thumbnails to database' })
  } finally {
    await prisma.$disconnect()
  }
}
