import lodash from 'lodash'
import { ProjectState } from '~core/models/project'
import { getPageUrl } from '~utils/misc'

export const CURRENT_VERSION=2

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

const UPGRADES={
  1: (p:ProjectState) => replaceLinks(p),
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
