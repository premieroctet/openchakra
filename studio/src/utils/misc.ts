import camelCase from 'lodash/camelCase'

const capitalize = (value: string) => {
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
