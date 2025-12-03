import { useState } from 'react'

import { ApplicationStatusBadge } from '@/components/common/badge/ApplicationStatusBadge'
import { FilterBar } from '@/components/common/filter'
import {
  Table,
  type Column,
  type PaginationResponse,
} from '@/components/common/table'
import { SERVICE_URLS } from '@/config/serviceUrls'
import { useFetchQuery } from '@/hooks/useFetchQuery'
import type { ApplicationsListResults } from '@/mocks/types/accounts'
import { StudyGroupDetailModal } from '@/pages/study/groups/StudyGroupDetailModal'
import { formatDateTime } from '@/utils'

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
    sort: '',
  })
  const [selectedApplication, setSelectedApplication] = useState<number | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isLoading, error, refetch } = useFetchQuery<
    PaginationResponse<Application>
  >({
    queryKey: ['applications', filters],
    url: SERVICE_URLS.APPLICATIONS.LIST,
    params: {
      page: filters.page,
      page_size: 10,
      search: filters.search,
      status: filters.status,
      sort: filters.sort,
    },
  })

  const columns: Column<Application>[] = [
    {
      key: 'id',
      header: 'ID',
      width: '100px',
    },
    {
      key: 'recruitment',
      header: '공고명',
      width: '300px',
      render: (_, row) => row.recruitment?.title || '-',
    },
    {
      key: 'applicant',
      header: '지원자 정보',
      width: '250px',
      render: (_, row) => (
        <div>
          <p className="font-medium text-gray-900">
            {row.applicant?.nickname || '-'}
          </p>
          <p className="text-sm text-gray-500">{row.applicant?.email || '-'}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: '지원 상태',
      width: '100px',
      render: (value: string) => <ApplicationStatusBadge status={value} />,
    },
    {
      key: 'created_at',
      header: '지원일시',
      width: '180px',
      sortable: {
        asc: 'oldest',
        desc: 'latest',
      },
      render: (value: string) => formatDateTime(value),
    },
    {
      key: 'updated_at',
      header: '수정일시',
      width: '180px',
      render: (value: string) => formatDateTime(value),
    },
  ]
  const handleRowClick = (application: Application) => {
    setSelectedApplication(application.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedApplication(null)
  }
  return (
    <>
      <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
        <FilterBar
          searchConfig={{
            label: '검색',
            placeholder: '공고명, 지원자 닉네임, 이메일 검색...',
            value: filters.search,
            onChange: (value) =>
              setFilters((prev) => ({ ...prev, search: value, page: 1 })),
          }}
          filters={[
            {
              label: '지원 상태',
              options: [
                { label: '승인', value: 'ACCEPTED' },
                { label: '대기', value: 'PENDING' },
                { label: '거절', value: 'REJECTED' },
                { label: '취소됨', value: 'CANCELED' },
              ],
              value: filters.status,
              onChange: (value) =>
                setFilters((prev) => ({ ...prev, status: value, page: 1 })),
            },
            {
              label: '정렬',
              options: [
                { label: '최신순', value: 'LATEST' },
                { label: '오래된순', value: 'OLDEST' },
              ],
              value: filters.sort,
              onChange: (value) =>
                setFilters((prev) => ({ ...prev, sort: value, page: 1 })),
            },
          ]}
        />
      </div>
      <Table
        columns={columns}
        response={data || { count: 0, results: [], next: null, previous: null }}
        currentPage={filters.page}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isLoading={isLoading}
        error={error?.message}
        onRetry={refetch}
        onRowClick={handleRowClick}
      />
      <StudyGroupDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        studyGroupId={selectedApplication}
      />
    </>
  )
}
