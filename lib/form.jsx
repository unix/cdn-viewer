import useFetch from 'use-http'
import Router from 'next/router'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Input, Tabs, Spacer, Text, Code, Button, useTabs, useInput, useToasts, Row } from '@zeit-ui/react'
import NpmIcon from './icons/npm'
import GithubIcon from './icons/github'
import { checkPackageName, getVersionUrl } from './utils'
import { useFilesContext } from './files-context'
import { useClipboard } from 'use-clipboard-copy'


const Form = () => {
  const router = useRouter()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const { loading, updateLoading, updateInfo } = useFilesContext()
  
  const { state, bindings, setState: setTabState } = useTabs('npm')
  const { state: NpmState, bindings: NpmInputBindings, setState: setNpmInput } = useInput('')
  const { state: GHState, bindings: GHInputBindings, setState: setGHInput } = useInput('')
  const [disabled, setDisabled] = useState(true)
  const [queryValue, setQueryValue] = useState({})
  const { data, get, error } = useFetch()
  
  const [currentValue, currentIsNpm] = useMemo(() => {
    const val = state === 'npm' ? NpmState : GHState
    return [val.trim(), state === 'npm']
  },[state, NpmState, GHState])

  const canShare = useMemo(() => {
    if (!data || !data.versions) return false
    return !!(data.versions.length > 0 && router.query.q)
  }, [router.query.q, data])

  useEffect(() => {
    setDisabled(!checkPackageName(currentValue, currentIsNpm))
  }, [NpmState, GHState, state])
  
  useEffect(() => {
    if (!data && !error) return
    const val = currentValue || queryValue.name
    const isNpm = currentIsNpm || queryValue.isNpm
    const hasError = !!error || (data.status && data.status !== 200) || data.versions.length === 0

    updateInfo({
      name: val,
      path: getVersionUrl(val, isNpm),
      versions: data.versions || [],
      notFound: hasError,
    })
    if (!hasError) {
      router
        .push(
          `/?q=${encodeURI(currentValue)}&npm=${currentIsNpm ? 1 : 0}`,
          undefined, { shallow: true },
        )
        .catch(err => console.log(err))
    }
    updateLoading(false)
  }, [data, error])

  const submit = () => {
    updateLoading(true)
    get(getVersionUrl(currentValue, currentIsNpm))
  }
  
  const keydownHandler = event => {
    const isEnter = event.nativeEvent.key === 'Enter' || event.nativeEvent.keyCode === 13
    if (!isEnter || disabled || loading) return
    submit()
  }
  
  useEffect(() => {
    const { q: name, npm } = Router.query
    if (!name) return
    const isNpm =  npm !== '0'
    const action = isNpm ? setNpmInput : setGHInput
    setQueryValue({ name, isNpm })
    setTabState(isNpm ? 'npm' : 'gh')
    action(name)
    get(getVersionUrl(name, isNpm))
  }, [])
  
  const shareHandler = () => {
    copy(location.href)
    setToast({ text: 'Address copied, share it anywhere!', type: 'success' })
  }

  return (
    <div className="form">
      <Tabs {...bindings}>
        <Tabs.Item label={<><NpmIcon /><Spacer inline x={.3} /> Npm Package</>} value="npm">
          <Text type="secondary" className="tips">Enter the <Code>name</Code> of the NPM package to search. </Text>
          <Input label="npmjs.com/package/" placeholder="package-name" {...NpmInputBindings} onKeyPress={keydownHandler} />
        </Tabs.Item>
        <Tabs.Item label={<><GithubIcon /> Repository</>} value="gh">
          <Text type="secondary" className="tips">Enter the <Code>username/repository_name</Code> of the github to search. </Text>
          <Input label="github.com/" placeholder="user/repo" {...GHInputBindings} onKeyPress={keydownHandler} />
        </Tabs.Item>
      </Tabs>
      <Spacer y={2} />
      <Row>
        <Button type="secondary" size="small"
          disabled={disabled}
          onClick={submit}
          loading={loading}>Done</Button>
        <Spacer inline x={.5} />
        {canShare && (
          <Button type="abort" size="small" auto onClick={shareHandler}>Share Now</Button>
        )}
      </Row>
  
      <style jsx>{`
        .form :global(.tips) {
          margin-top: 7px;
          margin-bottom: .5rem;
          font-size: .85em;
        }
      `}</style>
    </div>
  )
}

export default Form
