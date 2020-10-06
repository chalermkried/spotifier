import { useEffect, useState } from 'react'

// https://github.com/streamich/react-use/blob/master/src/useIntersection.ts
function useIntersection(ref, options) {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = useState(
    null,
  )

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
      const handler = (entries) => {
        setIntersectionObserverEntry(entries[0])
      }

      const observer = new IntersectionObserver(handler, options)
      observer.observe(ref.current)

      return () => {
        setIntersectionObserverEntry(null)
        observer.disconnect()
      }
    }
    return () => {}
  }, [ref.current, options.threshold, options.root, options.rootMargin])

  return intersectionObserverEntry
}

export default useIntersection
