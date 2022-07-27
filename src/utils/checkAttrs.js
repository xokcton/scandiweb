const checkAttrs = (foundAttrs, receivedAttrs) => {
  const keys = Object.keys(foundAttrs)
  let flag = false
  for (let i = 0; i < keys.length; i++) {
    if (foundAttrs[keys[i]] !== receivedAttrs[keys[i]]) flag = true
    if (flag) return false
  }
  return true
}

export default checkAttrs