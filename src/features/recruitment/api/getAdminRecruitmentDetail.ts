import { authFetch } from '@/api/client'
import { SERVICE_URLS } from '@/config/serviceUrls'
import type { GetRecruitmentDetailResponse } from '@/types/api/response'

export async function getAdminRecruitmentDetail(
  recruitment_id: number
): Promise<GetRecruitmentDetailResponse> {
  const res = await authFetch(
    `${SERVICE_URLS.RECRUITMENTS.DETAIL(recruitment_id)}`
  )

  if (!res.ok) {
    throw new Error('구인공고 상세 정보를 불러오지 못했습니다.')
  }

  return res.json()
}
