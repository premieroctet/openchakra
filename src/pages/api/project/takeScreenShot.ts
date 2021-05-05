import { NextApiRequest, NextApiResponse } from 'next'
const chromium = require('chrome-aws-lambda')

export default async function TakeScreenshot(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const pageToScreenshot = req.body.pageToScreenshot
  let result = null
  let browser: any = null
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
    let screen = await screenShot()

    let screenBodyData = {
      id: req.body.id,
      screen,
      accessToken: req.body.accessToken,
    }

    await fetch(baseUrl + '/api/project/updateScreenShot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenBodyData),
    })

    res.status(201)
    res.json({ success: 'Screenshot was saved successfully !' })
  } catch (e) {
    res.status(500)
    res.json({ error: 'Sorry unable to saved screenshot project' })
  }
}
