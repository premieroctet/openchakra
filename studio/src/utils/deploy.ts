import lodash from 'lodash'
import { ProjectState } from '~/core/models/project'
import { PageSettings } from '../core/models/project';
import { build, copyFile, install, start, clean } from './http'
import { generateCode, generateApp } from './code'
import { normalizePageName } from './misc';
import { validateComponents , validateProject} from './validation'

// If true, build target project when compliaiton fixed
const TARGET_BUILD = false

const copyCode = (pageName: string, contents: Buffer) => {
  return copyFile({
    contents: contents,
    filePath: `${normalizePageName(pageName)}.js`,
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
    .then(() => {
      return generateApp(state)
    })
    .then(code => {
      return copyCode('App', code)
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
