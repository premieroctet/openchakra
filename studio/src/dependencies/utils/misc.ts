const THUMBNAILS_DIR = 'thumbnails'

export function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const NOT_CONNECTED="NOT_CONNECTED"

export const normalize = (str:string) => {
  str = str
    ? str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : ''
  return str
}


export const matcher = (pattern:string, elements:Array<any>, attribute:string) => {
  if (!elements) { return elements}
  const patternElements=normalize(pattern).trim().split(' ')
  // Default search: match every pattern element
  const andExp=new RegExp(patternElements.map(att => `(?=.*${att})`).join(''))
  const andResult=elements.filter(d =>andExp.test(normalize(d[attribute])))
  return andResult
  // TODO: if required, search with ANY ppattern element
  /**
  if (andResult.length>0) {
    return andResult
  }
  // Else try ANY of the words
  const orExp= new RegExp(`(${patternElements.join('|')})`)
  const orResult=elements.filter(d =>orExp.test(normalize(d[attribute])))
  return orResult
  */
}


export const imageSrcSetPaths = (originalSrc:string, withDimension=true) => {

  /**
   * src filename example containing sizes: 
   * https://******.amazonaws.com/devtest/studio/wappizy_srcset:500*1000*1920.webp
   * 
   * example of filepath derived for a smaller image
   * https://******.amazonaws.com/thumbnails/devtest/studio/wappizy_w:500.webp
   * 
   */
  let srcSet = undefined

  const filePathParts = originalSrc.split("_srcset:") || originalSrc.split(encodeURIComponent("_srcset:"));
  const filenameextension = originalSrc.substring(originalSrc.lastIndexOf('.') + 1, originalSrc.length)
      
      if (filePathParts.length > 1) {
        const availableSizes = filePathParts[1].match(/\d+/g);
        const availableSizesQty = availableSizes?.length
        srcSet = availableSizes && availableSizes
          .map((size, index) => {
            if ((index + 1) === availableSizesQty) {
              return `${originalSrc}${withDimension ? ` ${size}w` : ''}`
            } else {
              const shortFilepathParts = filePathParts[0].split('/')
              // index to add thumbnails folder after https://******.amazonaws.com
              const indexToPushThumbnails = 3
              const thumbnailsFilepath = shortFilepathParts
                .slice(0, indexToPushThumbnails)
                .concat(THUMBNAILS_DIR, shortFilepathParts.slice(indexToPushThumbnails));
              return `${thumbnailsFilepath.join('/')}_w:${size}.${filenameextension}${withDimension ? ` ${size}w` : ''}`
            }
          })
      }
      
  return srcSet
}

