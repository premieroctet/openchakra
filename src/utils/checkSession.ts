export const checkUser = async (name: string) => {
  const response = await fetch('http://localhost:3000/api/project/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(name),
  })
  const data = await response.json()
  return data
}
