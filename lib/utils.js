
export const api = 'https://data.jsdelivr.com/v1/package'

export const cdn = 'https://cdn.jsdelivr.net'

export const getVersionUrl = (name, isNpm = true) => {
  return `/${isNpm ? 'npm' : 'gh'}/${name}`
}

export const getFielUrl = (name, isNpm = true) => {
  return `/${isNpm ? 'npm' : 'gh'}/${name}/`
}

export const getCDNUrl = (path, file, version) => {
  
  const safeVersion = version.includes('@')
    ? version.split('@').reverse()[0]
    : version
  return `${cdn}${path}@${safeVersion}/${file}`
}

export const checkPackageName = (name, isNpm) => {
  if (!name) return false
  name = name.trim()
  if (name === '') return false
  if (isNpm) return true
  if (!name.includes('/')) return false
  
  if (name.split('/').length > 2) return false
  
  return true
}

export const formatSize = (size) => {
  size = +size
  if (Number.isNaN(size)) return null
  
  if (size < 1000) return `${size}b`
  if (size / 1000 < 1000) return `${(size / 1000).toFixed(2)}kb`
  return  `${(size / (1000 * 1000)).toFixed(2)}mb`
}
