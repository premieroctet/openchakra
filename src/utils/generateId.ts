export const generateId = () => {
  return `comp-${(
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 5)
  ).toUpperCase()}`
}
