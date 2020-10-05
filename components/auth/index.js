import { apiGetNewRelease } from 'lib/api'
import { Wrapper } from './style'

function Auth() {
  const redirectogin = () => {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=eec7ddfc65c34f9dae8e2df81c870283&response_type=token&redirect_uri=${encodeURIComponent(
      window.location.origin,
    )}`
  }

  const getNewRelease = async () => {
    const res = await apiGetNewRelease()

    console.log('got new release', res)
  }

  return (
    <Wrapper>
      <div className="auth">
        <h1 className="title">Title</h1>
        <button onClick={redirectogin}>Continue with Spotify</button>
        <button onClick={getNewRelease}>Access as Guest</button>
      </div>
    </Wrapper>
  )
}

export default Auth
