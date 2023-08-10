
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
