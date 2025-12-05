import { useQuery } from '@tanstack/react-query'

import { getAccountsMe } from '@/api/getAccountsMe'
import type { AccountsMe } from '@/mocks/types/accounts'

export const useAccountsMeQuery = () => {
  return useQuery<AccountsMe>({
    queryKey: ['account', 'me'],
    queryFn: getAccountsMe,
  })
}
