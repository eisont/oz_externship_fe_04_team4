import { useEffect } from 'react'

import { handleApiError } from '@/api/handleApiError'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { WITHDRAWALS_API_ERROR_MESSAGE } from '@/pages/members/withdrawals/api/withdrawalsErrorMessageMap'
import type { WithDrawDetailInfo } from '@/pages/types/withdraw'

export function useWithdrawalsDetail(
  withdrawalId: number | null,
  isOpen: boolean
) {
  const queryDetail = useFetchQuery<WithDrawDetailInfo>({
    queryKey: ['withdrawal-detail', withdrawalId],
    url: SERVICE_URLS.WITHDRAWALS.DETAIL(withdrawalId || 0),
    enabled: !!withdrawalId && isOpen,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    if (queryDetail.error) {
      handleApiError(queryDetail.error, WITHDRAWALS_API_ERROR_MESSAGE.detail)
    }
  }, [queryDetail.error])

  return queryDetail
}
