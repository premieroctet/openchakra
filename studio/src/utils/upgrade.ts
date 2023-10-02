import lodash from 'lodash'
import { ProjectState } from '~core/models/project'
import { getPageUrl } from '~utils/misc'

export const CURRENT_VERSION=3

const replaceLinks= (project: ProjectState) => {
  const pairs=Object.keys(project.pages).map(pId => [getPageUrl(pId, project.pages), pId])
  console.log(`Pairs:${JSON.stringify(pairs)}`)
  const pageUrls=lodash.fromPairs(pairs)
  console.log(`URLS:${JSON.stringify(pageUrls)}`)

  const replaceLink= (href:string) => {
    if (pageUrls[href]) {
      return pageUrls[href]
    }
    console.log(`Unknown page ${href}`)
    return href
  }

  const links=lodash(project.pages).values()
    .map(p => Object.values(p.components)).flatten()
    .filter(c => c.type=='Link' && !!c.props.href)

  links.forEach(l => {
    l.props.href=replaceLink(l.props.href)
  })

  return project
}

export const updateDownloadableAttribute= (project: ProjectState) => {
  const cloneProject=lodash.cloneDeep(project)
  Object.values(cloneProject.pages).forEach(page => {
    Object.values(page.components).forEach(component => {
      if ('canDownload' in component.props) {
        console.log('before', component.props)
        component.props.downloadable=component.props.canDownload
        delete component.props.canDownload
        console.log('after', component.props)
      }
    })
  })

  return cloneProject
}

interface UpgradeFunctions {
  [key: number]: (p: ProjectState) => ProjectState;
}
const UPGRADES: UpgradeFunctions={
  1: (p:ProjectState) => replaceLinks(p),
  2: (p:ProjectState) => updateDownloadableAttribute(p),
}

export const upgradeProject = (project:ProjectState) => {
  const version=project.version || 1
  project.version=version
  while (project.version<CURRENT_VERSION) {
    console.log(`Upgrading project from V${project.version} to V${project.version+1}`)
    const fn=UPGRADES[project.version]
    project=fn(project)
    project.version=project.version+1
  }
  return project
}
