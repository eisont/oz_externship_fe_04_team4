import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { GetApplicationsDetailResponse } from '@/types/api/response'

export async function getAdminApplicationDetail(
  application_id: number
): Promise<GetApplicationsDetailResponse> {
  const res = await authFetch(
    `${SERVICE_URLS.APPLICATIONS.DETAIL(application_id)}`
  )

  if (!res.ok) {
    throw new Error('구인공고 상세 정보를 불러오지 못했습니다.')
  }

  return res.json()
}
