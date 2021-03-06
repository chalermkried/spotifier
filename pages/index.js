import Auth from 'components/auth'
import CustomHead from 'components/custom-head'
import OverlayLoader from 'components/shared/overlay-loader'
import { STORAGE_KEY_TOKEN } from 'lib/const'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN)

    if (token) {
      router.push('/feed')
      return
    }

    setIsLoggedIn(false)
  }, [router])

  return (
    <>
      <CustomHead />
      <main>{isLoggedIn === false ? <Auth /> : <OverlayLoader />}</main>
    </>
  )
}

export default Home
