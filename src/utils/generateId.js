const generateId = () => {
  let id = ""
  const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const idLength = 12

  for (let i = 0; i < idLength; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length))

  return id + new Date().getTime()
}

export default generateId