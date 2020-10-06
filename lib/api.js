import Axios from 'axios'
import {
  ERROR_TOKEN_EXPIRED,
  STORAGE_KEY_IS_LOGGED_IN,
  STORAGE_KEY_TOKEN,
} from './const'

function errorHandler(err) {
  const isInvalidToken =
    err.response.status === 400 || err.response.status === 401

  if (isInvalidToken) {
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    localStorage.removeItem(STORAGE_KEY_IS_LOGGED_IN)
    window.location.href = `${window.location.origin}?error=${ERROR_TOKEN_EXPIRED}`
  }

  return undefined
}

async function interceptor(req) {
  try {
    const res = await req()

    return res.data
  } catch (err) {
    return errorHandler(err)
  }
}

export async function getAndSetClientCredentialsToken() {
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
    localStorage.setItem(STORAGE_KEY_TOKEN, token)

    return token
  }

  return ''
}

export async function apiGetNewRelease({ limit = 10, page = 1 }) {
  return interceptor(() =>
    Axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/browse/new-releases?limit=${limit}&offset=${
        (page - 1) * limit
      }`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY_TOKEN)}`,
      },
    }),
  )
}

export async function apiGetUserInfo() {
  return interceptor(() =>
    Axios({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY_TOKEN)}`,
      },
    }),
  )
}
