import camelCase from 'lodash/camelCase'
import lucidicons from '~lucideiconsList'
import icons from '~iconsList'
import theme from '~dependencies/theme/theme'
import { PageState } from '~core/models/project'

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const normalizePageName = (pageName: string) => {
  return capitalize(camelCase(pageName))
}

export const getPageFileName = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  return normalizePageName(pages[pageId].pageName)
}

export const urlClean = (url: string) => url
  .toLowerCase()
  .replace(/ /gi, '-')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')

export const getPageUrl = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  try {
    if (!pages[pageId]) {
      throw new Error(`Page ${pageId} inconnue`)
    }
    return pages?.[pageId]?.pageName && urlClean(pages?.[pageId]?.pageName)
      
  } catch (err) {
    console.error(`getPageUrl ${pageId}:${err}`)
    return pageId
    //throw err
  }
}

export function whatTheHexaColor(color: string) {
  const colorArray = typeof color === 'string' && color?.split('.') || color
  const isChakraTint = colorArray?.[1] // get the tint

  let retainedColor = colorArray?.[0]

  if (isChakraTint) {
    retainedColor = theme.colors[retainedColor]?.[isChakraTint]
  }

  return retainedColor
}

export function addBackslashes(str: string) {
  return str
    .replace(/\\/, '')
    .replace(/'/g, "\\'")
}

export const iconStuff = ({
  icon,
  dataLib = '',
  color,
  size,
  fill
}: {
  icon: string,
  dataLib: string,
  color?: string,
  size?: string,
  fill?: string,
}) => {

  let IconFromSet, iconProps = null

  const colorHexa = whatTheHexaColor(color || 'black')
  const colorFillHexa = whatTheHexaColor(fill || 'black')

  switch (dataLib) {
    case 'lucid':
      if (Object.keys(lucidicons).includes(icon)) {
        IconFromSet = lucidicons[icon as keyof typeof icons]
        iconProps = {color: colorHexa, fill: colorFillHexa, size: size || 'auto'}
      }
    break;

    // Chakra Icons by default
    default:
      if (Object.keys(icons).includes(icon)) {
        IconFromSet = icons[icon as keyof typeof icons]
        iconProps = {color: colorHexa, width: "auto", height: "auto", boxSize: size, path: ""}
      }
    break;
  }

  return {IconFromSet, iconProps}
}

export const REDIRECT_COUNT=4
export const REDIRECT_ROLE=`autoRedirectRole_`
export const REDIRECT_PAGE=`autoRedirectPage_`
export const DEFAULT_REDIRECT_PAGE=`defaultRedirectPage`
