import { useState } from 'react'

import { Table, type PaginationResponse } from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { ApplicationColumns } from '@/features/application/columns'
import ApplicationDetailModal from '@/features/application/ui/ApplicationDetailModal'
import ApplicationFilter from '@/features/application/ui/ApplicationFilter'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { ApplicationsListResults } from '@/mocks/types/accounts'

type Application = ApplicationsListResults

export default function ApplicationManagementPage() {
  const [filters, setFilters] = useState<{
    search: string
    page: number
    status: string
    sort: string
  }>({
    search: '',
    page: 1,
    status: '',
    sort: 'latest',
  })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<Application>
  >({
    queryKey: ['applications', filters],
    url: SERVICE_URLS.APPLICATIONS.LIST,
    params: {
      page_size: 10,
      ...filters,
    },
  })

  const handleRowClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <ApplicationDetailModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />

      <ApplicationFilter />

      <Table
        columns={ApplicationColumns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      />
    </>
  )
}
