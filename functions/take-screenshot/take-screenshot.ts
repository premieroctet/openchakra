import { prisma } from '../../src/utils/prisma'
const chromium = require('chrome-aws-lambda')

exports.handler = async (event, context) => {
  let ts = new Date()

  const params = JSON.parse(event.body)
  const pageToScreenshot = params.pageToScreenshot

  let result = null
  let browser: any = null
  let screen = null

  const project = await prisma.project.findMany({
    include: { user: true },
    where: {
      id: params.id,
    },
  })

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
      await page.goto(pageToScreenshot)
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

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Complete screenshot of ${pageToScreenshot}`,
    }),
  }
}
