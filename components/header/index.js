import { useEffect, useState } from 'react'
import { STORAGE_KEY_IS_LOGGED_IN, STORAGE_KEY_TOKEN, TITLE } from 'lib/const'
import { useRouter } from 'next/router'
import { apiGetUserInfo } from 'lib/api'
import { Nav } from './style'
import UserInfo from './user-info'

function Header() {
  const router = useRouter()
  const [isLoggedIn] = useState(
    localStorage.getItem(STORAGE_KEY_IS_LOGGED_IN) === 'true',
  )
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    async function fetchUserInfo() {
      const res = await apiGetUserInfo()

      setUserInfo(res)
    }

    if (isLoggedIn) {
      fetchUserInfo()
    }
  }, [isLoggedIn])

  const logOut = (e) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }

    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_IS_LOGGED_IN)
    router.push('/')
  }

  return (
    <Nav>
      <div className="container">
        <h1 className="left-block">{TITLE}</h1>
        <input type="text" placeholder="Search" />
        <div className="right-block">
          {isLoggedIn ? (
            <UserInfo
              image={userInfo.images?.[0]?.url}
              name={userInfo.display_name}
            />
          ) : (
            'Guest'
          )}
          <a className="log-out" href="/" onClick={logOut}>
            Log Out
          </a>
        </div>
      </div>
    </Nav>
  )
}

export default Header
