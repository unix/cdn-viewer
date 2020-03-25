import { useEffect, useRef, useState } from 'react'


const useCurrentState = (initialState) => {
  const [state, setState] = useState(initialState)
  const ref = useRef(null)

  useEffect(() => {
    ref.current = state
  }, [state])

  const setValue = (val) => {
    ref.current = val
    setState(val)
  }

  return [state, setValue, ref]
}

export default useCurrentState
