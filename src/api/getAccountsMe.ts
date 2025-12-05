import { authFetch } from '@/api/client'
import type { AccountsMe } from '@/mocks/types/accounts'

export async function getAccountsMe(): Promise<AccountsMe> {
  const res = await authFetch(`/accounts/me`, {
    method: 'GET',
  })

  return res.json()
}
