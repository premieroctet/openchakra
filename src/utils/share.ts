export const createShareUrl = (components: IComponents) =>
  `${document.location.host}/?share=${btoa(
    unescape(encodeURIComponent(JSON.stringify(components))),
  )}`

export const decodeShareUrl = (): IComponents | null => {
  try {
    const searchParams = new URLSearchParams(document.location.search)
    const sharedData = searchParams.get('share')

    if (sharedData) {
      return JSON.parse(decodeURIComponent(escape(atob(sharedData))))
    }
  } catch (e) {
    console.log(e)
  }

  return null
}
