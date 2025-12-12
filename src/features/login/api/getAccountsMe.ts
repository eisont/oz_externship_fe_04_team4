import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { GetAccountsMeResponse } from '@/types/api/response'

export async function getAccountsMe(): Promise<GetAccountsMeResponse> {
  const res = await authFetch(`${SERVICE_URLS.ACCOUNTS.ME}`)

  return res.json()
}
