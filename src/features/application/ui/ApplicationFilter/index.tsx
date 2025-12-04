import { useState } from 'react'

import { FilterBar } from '@/components/common/filter'

export default function ApplicationFilter() {
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

  return (
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
              { label: '최신순', value: 'latest' },
              { label: '오래된순', value: 'oldest' },
            ],
            value: filters.sort,
            onChange: (value) =>
              setFilters((prev) => ({ ...prev, sort: value, page: 1 })),
          },
        ]}
      />
    </div>
  )
}
