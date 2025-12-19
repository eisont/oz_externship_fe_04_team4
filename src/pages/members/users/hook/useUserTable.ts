// useUserTable.ts
import { useEffect } from 'react'

import { handleApiError } from '@/api/handleApiError'
import type { PaginationResponse } from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import { USER_API_ERROR_MESSAGE } from '@/pages/members/users/api/userErrorMessageMap'
import type { UserApiRawItem } from '@/pages/types/users'

export function useUserTable(filters: {
  page: number
  search?: string
  role?: string
  status?: string
  reason?: string
  sort?: string
}) {
  const query = useFetchQuery<PaginationResponse<UserApiRawItem>>({
    queryKey: ['users-list', filters],
    url: SERVICE_URLS.ACCOUNTS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      role: filters.role,
      sort: filters.sort,
    },
  })

  useEffect(() => {
    if (query.error) {
      handleApiError(query.error, USER_API_ERROR_MESSAGE.list)
    }
  }, [query.error])

  return query
}
