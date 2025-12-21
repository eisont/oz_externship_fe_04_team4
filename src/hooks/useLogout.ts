import { useQueryClient } from '@tanstack/react-query'

import { useNavigate } from 'react-router'

import { ROUTE_PATHS } from '@/app/router/routePaths'
import { AUTH_PERSIST_KEY } from '@/config'
import { useAuthStore } from '@/store/authStore'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  return () => {
    if (!confirm('로그아웃 하시겠습니까?')) return

    clearAuth()

    try {
      sessionStorage.removeItem(AUTH_PERSIST_KEY)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[logout] sessionStorage removeItem failed', err)
    } finally {
      queryClient.clear()
      navigate(ROUTE_PATHS.LOGIN, { replace: true })
    }
  }
}
