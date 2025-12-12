import { useQuery } from '@tanstack/react-query'

import { getAccountsMe } from '@/features/login/api'
import { useAuthStore } from '@/store/authStore'
import type { GetAccountsMeResponse } from '@/types/api/response'

export const useAccountsMeQuery = () => {
  const accessToken = useAuthStore((s) => s.accessToken)

  return useQuery<GetAccountsMeResponse>({
    queryKey: ['account', 'me'],
    queryFn: getAccountsMe,
    enabled: !!accessToken,
  })
}
