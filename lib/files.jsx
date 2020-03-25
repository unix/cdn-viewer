import React, { useEffect, useMemo, useState } from 'react'
import { Tree, Row, Col, Radio, Card, Code, Note, useToasts } from '@zeit-ui/react'
import { useClipboard } from 'use-clipboard-copy'
import { useFilesContext } from './files-context'
import useFetch from 'use-http'
import { formatSize, getCDNUrl } from './utils'
import useCurrentState from './use-current-state'

const makeVersions = (versions = [], onClick) => {
  if (!versions || !versions.length) return null
  return (
    <Radio.Group className="group" value={versions[0]} onChange={val => onClick && onClick(val)}>
      {versions.map((item, index) => (
        <Radio value={item} key={`version-${index}`}>{item}</Radio>
      ))}
      <style jsx>{`
        :global(.group) {
          padding-left: 1rem;
          padding-top: 1.5rem;
        }
      `}</style>
    </Radio.Group>
  )
}

const makeTitle = (len) => {
  if (!len) return null
  return (
    <p>
      <Code>{len}</Code> versions.
      <style jsx>{`
        p {
          text-align: center;
        }
        
        p :global(code) {
          font-size: 1.3em;
        }
      `}</style>
    </p>
  )
}

const sizeToExtra = files => {
  if (!files || !files.length) return []
  return files.map(item => {
    const children = item.files ? sizeToExtra(item.files) : null
    const size = item.size ? formatSize(item.size) : null
    return {
      ...item,
      extra: size ? `${size}` : null,
      files: children,
    }
  })
}

const Files = () => {
  const { info } = useFilesContext()
  const { data, get } = useFetch()
  const { copy } = useClipboard()
  const [_, setToast] = useToasts()
  const [selfInfo, setSelfInfo, infoRef] = useCurrentState()
  const [files, setFiles] = useState([])
  const [currentVersion, setCurrentVersion] = useState('')
  const showVersions = useMemo(() => !!(info.name && info.versions.length), [info])

  const clickHandler = val => {
    get(`${info.path}@${val}`)
    setCurrentVersion(`${info.name}@${val}`)
  }

  const fileClickHandler = filePath => {
    const cdnPath = getCDNUrl(infoRef.current.path, filePath, currentVersion)
    copy(cdnPath)
    setToast({ text: `CDN url copied: ${cdnPath}` })
  }

  useEffect(() => {
    if (!data || !data.files) return
    setFiles(sizeToExtra(data.files))
  }, [data])
  
  useEffect(() => {
    if (info.versions && info.versions.length > 0) {
      clickHandler(info.versions[0])
    }
  }, [info.versions])
  
  useEffect(() => setSelfInfo(info), [info, info.name, info.path, info.notFound])

  if (info.notFound) return (
    <Note type="warning" label="Not Found">No package named <Code>{info.name}</Code>.</Note>
  )

  return (
    <Row>
      <Col span={12}>
        {showVersions && (
          <Card>
            {makeTitle(info.versions.length)}
            <hr/>
            {makeVersions(info.versions, clickHandler)}
          </Card>
        )}
      </Col>
      <Col span={.5} />
      <Col>
        {currentVersion && (
          <Card className="files-card">
            <h4><Code>{currentVersion}</Code></h4>
            <hr/>
            <Tree value={files} onClick={fileClickHandler} />
          </Card>
        )}
      </Col>
  
      <style jsx>{`
        :global(.files-card) {
          min-height: 100%;
        }
      `}</style>
    </Row>
  )
}

export default Files
