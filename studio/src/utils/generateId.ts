export const generateId = (prefix = 'comp') => {
  return `${prefix}-${(
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase()}`
}
