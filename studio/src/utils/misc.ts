import camelCase from 'lodash/camelCase'
import lucidicons from '~lucideiconsList'
import icons from '~iconsList'
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

export const getPageUrl = (
  pageId: string,
  pages: { [key: string]: PageState },
) => {
  try {
    if (!pages[pageId]) {
      throw new Error(`Page ${pageId} inconnue`)
    }
    return pages?.[pageId]?.pageName
      .toLowerCase()
      .replace(/ /gi, '-')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
  } catch (err) {
    console.error(`getPageUrl ${pageId}:${err}`)
    return pageId
    //throw err
  }
}

export const iconStuff = ({
  icon, 
  dataLib = '', 
  color = "#000", 
  size = "24px"
}: {
  icon: string, 
  dataLib: string, 
  color?: string, 
  size?: string,
}) => {

  let IconFromSet, iconProps = null
  
  switch (dataLib) {
    case 'lucid':
      if (Object.keys(lucidicons).includes(icon)) {
        IconFromSet = lucidicons[icon as keyof typeof icons]
        iconProps = {color, size}
      }
    break;
      
    // Chakra Icons by default
    default:
      if (Object.keys(icons).includes(icon)) {
        IconFromSet = icons[icon as keyof typeof icons]
        iconProps = {color, boxSize: size, path: ""}
      }
    break;
  }

  return {IconFromSet, iconProps}
}