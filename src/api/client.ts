import { API_V1_PREFIX, BASE_URL } from '@/config/api'
import { useAuthStore } from '@/store/authStore'

type AdminFetchOptions = Omit<RequestInit, 'headers'> & {
  skipAuth?: boolean
  headers?: Record<string, string>
}

export async function authFetch(path: string, options: AdminFetchOptions = {}) {
  const { skipAuth, headers, ...rest } = options

  const accessToken = useAuthStore.getState().accessToken

  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (!skipAuth && accessToken) {
    mergedHeaders.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(`${BASE_URL}${API_V1_PREFIX}${path}`, {
    ...rest,
    headers: mergedHeaders,
  })

  return res
}
