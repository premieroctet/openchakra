import * as LZString from 'lz-string'

export const createShareUrl = (components: IComponents) =>
  `${document.location.protocol}//${
    document.location.host
  }/?share=${LZString.compressToEncodedURIComponent(
    JSON.stringify(components),
  )}`

export const decodeShareUrl = (): IComponents | null => {
  try {
    const searchParams = new URLSearchParams(document.location.search)
    const sharedData = searchParams.get('share')

    if (sharedData) {
      return JSON.parse(
        LZString.decompressFromEncodedURIComponent(sharedData) as string,
      )
    }
  } catch (e) {
    console.log(e)
  }

  return null
}
