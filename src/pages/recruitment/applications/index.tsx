import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Table } from '@/components/common/table'
import { ApplicationColumns } from '@/features/application/columns'
import ApplicationDetailModal from '@/features/application/ui/ApplicationDetailModal'
import ApplicationFilter from '@/features/application/ui/ApplicationFilter'
import {
  getAdminApplication,
  type GetAdminApplicationParams,
} from '@/features/recruitment/api/getAdminApplication'
import type { ApplicationsList } from '@/mocks/types/accounts'

const PAGE_SIZE = 10

export default function ApplicationManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const [queryParams, setQueryParams] = useState<GetAdminApplicationParams>({
    search: '',
    page: 1,
    page_size: PAGE_SIZE,
    status: 'all',
    sort: 'latest',
  })

  const { data, isLoading, error, refetch } = useQuery<ApplicationsList>({
    queryKey: ['applications', queryParams],
    queryFn: () => getAdminApplication(queryParams),
  })

  return (
    <>
      <ApplicationDetailModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />

      <ApplicationFilter
        setQueryParams={setQueryParams}
        queryParams={queryParams}
      />

      <Table
        columns={ApplicationColumns}
        response={
          data ?? {
            count: 0,
            next: null,
            previous: null,
            results: [],
          }
        }
        currentPage={queryParams.page}
        onPageChange={(page) => setQueryParams((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      />
    </>
  )
}
