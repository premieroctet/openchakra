import 'dotenv/config'
import lodash from 'lodash'
import { ProjectState } from '~/core/models/project'
import { PageSettings } from '../core/models/project';
import { build, copyFile, install, start, clean } from './http'
import { generateCode, generateApp } from './code'
import { normalizePageName, urlClean } from './misc';
import { validateComponents , validateProject} from './validation'

// If true, build target project when comilation fixed
const TARGET_BUILD = process.env.NEXT_PUBLIC_MODE in ['production', 'validation'] || false

const copyCode = (pageName: string, contents: Buffer) => {

  return copyFile({
    contents: contents,
    filePath: `${urlClean(pageName)}.js`,
  })
}

const cleanPages = (pages:PageSettings[]) => {
  return clean(pages.map(page => `${normalizePageName(page.pageName)}.js`))
}

export const deploy = (state: ProjectState, models: any) => {
  const pages = Object.values(state.pages)
  return Promise.resolve(validateProject(state))
    .then(res => {
      if (res) {
        throw new Error(JSON.stringify(res, null, 2))
      }
      return Promise.all(
        pages.map(page => {
          return generateCode(page.pageId, state.pages, models)
            .catch(err => {
              console.error('generate pages while deploying', err)
              return Promise.reject(`Page "${page.pageName}":${err}`)
            })
        })
      )
    })
    .then(codes => {
      const namedCodes = lodash.zip(
        pages.map(nc => nc.pageName),
        codes,
      )
      return Promise.all(
        namedCodes.map(([pageName, code]) => copyCode(pageName, code)),
      )
    })
    .then(async() => {
      // generate again index
      const code = await generateCode(state.rootPage, state.pages, models)
      .catch(err => {
        console.error('generate index while deploying', err)
        return Promise.reject(`Page index :${err}`)
      })
      return code
    })
    .then(code => {
      return copyCode('index', code)
    })
    .then(() => {
      return cleanPages(pages)
    })
    .then(() => {
      return install()
    })
    .then(() => {
      return TARGET_BUILD ? build().then(() => start()) : true
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}
