import React from 'react'

const defaultContext = {
  info: {
    name: '',
    path: '',
    versions: [],
    notFound: false,
  },
  updateInfo: () => {},
  packageName: '',
  updatePackageName: '',
  loading: false,
  updateLoading: () => {},
  versions: [],
  updateVersions: () => {},
  files: [],
  updateFiles: () => {},
}

export const FilesContext = React.createContext(defaultContext)

export const useFilesContext = () => React.useContext(FilesContext)
