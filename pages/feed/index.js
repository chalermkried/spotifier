import CustomHead from 'components/custom-head'
import FeedBody from 'components/feed-body'
import Header from 'components/header'
import OverlayLoader from 'components/shared/overlay-loader'
import { STORAGE_KEY_TOKEN } from 'lib/const'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Feed() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN)

    if (!token) {
      router.push('/')
      return
    }

    setIsLoggedIn(true)
  }, [router])

  return (
    <>
      <CustomHead />
      {isLoggedIn ? (
        <>
          <Header />
          <main>
            <FeedBody />
          </main>
        </>
      ) : (
        <OverlayLoader />
      )}
    </>
  )
}

export default Feed
