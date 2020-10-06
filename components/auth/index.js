import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  ERROR_ACCESS_DENIED,
  ERROR_TOKEN_EXPIRED,
  SPOTIFY_APP_API,
  STORAGE_KEY_IS_LOGGED_IN,
  STORAGE_KEY_TOKEN,
  TITLE,
} from 'lib/const'
import { getAndSetClientCredentialsToken } from 'lib/api'
import OverlayLoader from 'components/shared/overlay-loader'
import { Wrapper } from './style'

function getImplicitGrantLink() {
  return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_APP_API}&response_type=token&redirect_uri=${encodeURIComponent(
    window.location.origin,
  )}`
}

function setAuth(token) {
  localStorage.setItem(STORAGE_KEY_TOKEN, token)
  localStorage.setItem(STORAGE_KEY_IS_LOGGED_IN, 'true')
}

function Auth() {
  const router = useRouter()
  const [hasAuthError, setHasAuthError] = useState(false)
  const [hasTokenExpiredError, setHasTokenExpiredError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')

    if (error) {
      if (error === ERROR_ACCESS_DENIED) {
        setHasAuthError(true)
      } else if (error === ERROR_TOKEN_EXPIRED) {
        setHasTokenExpiredError(true)
      }

      router.replace('/')
    } else {
      const paramsFromHash = new URLSearchParams(
        window.location.hash.replace('#', '?'),
      )
      const newToken = paramsFromHash.get('access_token')

      if (newToken) {
        setAuth(newToken)
        router.push('/feed')
        return
      }
    }

    setIsLoading(false)
  }, [router])

  const logInAsGuest = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }

    setIsLoading(true)

    try {
      await getAndSetClientCredentialsToken()

      router.push('/feed')
    } catch (err) {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <OverlayLoader />
  }

  return (
    <Wrapper>
      <div className="auth">
        <h1 className="title">{TITLE}</h1>
        {hasTokenExpiredError && 'Your token has expired, please log in again.'}
        {hasAuthError &&
          'There was something with Spotify authentication, please try again.'}
        <a
          className={isLoading ? 'loading' : ''}
          href={getImplicitGrantLink()}
          target="_self"
        >
          Continue with Spotify
        </a>
        <a
          className={isLoading ? 'loading' : ''}
          href="/feed"
          onClick={logInAsGuest}
        >
          Access as Guest
        </a>
      </div>
    </Wrapper>
  )
}

export default Auth
