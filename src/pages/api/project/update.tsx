import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
//const chromium = require('chrome-aws-lambda')

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()
  let ts = new Date()

  try {
    const { project: projectData } = req.body
    //   let result = null
    //   let browser: any = null
    //   const href = `${process.env.DEPLOY_URL}/project/preview/${projectData.id}-${projectData.projectName}`

    //   const screenShot = async () => {
    //     try {
    //       browser = await chromium.puppeteer.launch({
    //         args: chromium.args,
    //         defaultViewport: chromium.defaultViewport,
    //         executablePath: await chromium.executablePath,
    //         headless: chromium.headless,
    //         ignoreHTTPSErrors: true,
    //       })
    //       let page = await browser.newPage()
    //       await page.goto(href)
    //       await page.screenshot({
    //         fullPage: true,
    //       })
    //       result = (await page.screenshot({
    //         encoding: 'base64',
    //       })) as string
    //     } catch (error) {
    //       return console.log(error)
    //     } finally {
    //       if (browser !== null) {
    //         await browser.close()
    //       }
    //     }
    //     return result
    //   }

    //   let screen = null
    //   if (projectData.validated) {
    //     screen = await screenShot()
    //   }

    const actualProject = await prisma.project.update({
      where: {
        id: projectData.id,
      },
      data: {
        markup: projectData.markup,
        public: projectData.public,
        //thumbnail: `data:image/png;base64, ${screen}`,
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
