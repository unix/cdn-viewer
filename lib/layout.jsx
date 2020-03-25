import React, { useMemo, useState } from 'react'
import { Spacer } from '@zeit-ui/react'
import { Provider as HttpProvider } from 'use-http'
import { FilesContext } from './files-context'
import { api } from './utils'

const Layout = ({ children }) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState({ path: '', versions: [] })
  
  const updateFiles = nextFiles => setFiles(nextFiles || [])
  const updateLoading = state => setLoading(state)
  const updateInfo = info => setInfo(info)
  
  const initialValue = useMemo(() => ({
    files, loading, info,
    updateFiles,
    updateLoading,
    updateInfo,
  }), [loading, info.name, info.path, info.notFound, files])

  return (
    <FilesContext.Provider value={initialValue}>
      <HttpProvider url={api}>
        <main>
          <Spacer y={3} />
          {children}
          <Spacer y={2} />
      
          <style jsx>{`
            main {
              width: 100%;
              max-width: 750px;
              margin: 0 auto;
            }
    
            @media (max-width: 676px) {
              main {
                max-width: 90vw;
              }
            }
          `}</style>
        </main>
      </HttpProvider>
    </FilesContext.Provider>
  )
}

export default Layout
