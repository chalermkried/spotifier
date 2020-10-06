import { useEffect } from 'react'
import useTimeoutFn from '../use-timeout-fn'

// https://github.com/streamich/react-use/blob/master/src/useDebounce.ts
export default function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms)

  useEffect(reset, deps)

  return [isReady, cancel]
}
