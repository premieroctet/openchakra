import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~utils/prisma'
const chromium = require('chrome-aws-lambda')

export default async function TakeScreenshot(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let ts = new Date()
  const pageToScreenshot = req.body.pageToScreenshot

  let result = null
  let browser: any = null
  let screen = null
  const baseUrl = req ? `https://${req.headers.host}` : ''

  const screenShot = async () => {
    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      })
      let page = await browser.newPage()
      await page.goto(baseUrl + pageToScreenshot)
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

  try {
    let bodyData = {
      projectId: req.body.id,
    }

    const response = await fetch(baseUrl + '/api/project/searchById', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    const project = await response.json()

    screen = await screenShot()

    await prisma.project.update({
      where: {
        id: project.project.id,
      },
      data: {
        thumbnail: `data:image/png;base64, ${screen}`,
        updatedAt: ts.toISOString(),
      },
    })

    res.status(201)
    res.json({ project })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to fetch project by this id' })
  } finally {
    await prisma.$disconnect()
  }
}
