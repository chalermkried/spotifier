import Axios from 'axios'

const STORAGE_KEY_TOKEN = 'cc_token'

async function getClientCredentialsToken() {
  const cacheToken = localStorage.getItem(STORAGE_KEY_TOKEN)

  if (cacheToken) {
    return cacheToken
  }

  const res = await Axios({
    method: 'GET',
    url: 'https://chalermkried.netlify.app/.netlify/functions/token',
  })

  if (res.data?.access_token) {
    const { access_token: token } = res.data
    // TODO: Add cache lifespan
    localStorage.setItem(STORAGE_KEY_TOKEN, `${token}`)

    return token
  }

  return ''
}

export async function apiGetNewRelease() {
  const res = await Axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/browse/new-releases',
    headers: {
      Authorization: await getClientCredentialsToken(),
    },
  })

  return res.data
}
