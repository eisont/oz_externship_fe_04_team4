import { useState } from 'react'

import { ApplicationSearchInput } from '@/components/common/filter/ApplicationSearchInput'
import { RecruitmentFilterSelect } from '@/components/common/filter/RecruitmentFilterSelect'
import type { ApplicationsStatus } from '@/mocks/types/accounts'

type ApplicationFiltersState = {
  search: string
  page: number
  status: ApplicationsStatus | string
  sort: 'latest' | 'oldest'
}

export default function ApplicationFilter() {
  const [filters, setFilters] = useState<ApplicationFiltersState>({
    search: '',
    page: 1,
    status: 'all',
    sort: 'latest',
  })

  const searchConfig = {
    label: '검색',
    placeholder: '공고명, 지원자 닉네임, 이메일 검색...',
    value: filters.search,
    onChange: (value: string) =>
      setFilters((prev) => ({ ...prev, search: value })),
  }

  const filter = [
    {
      label: '지원 상태',
      options: [
        { label: '승인', value: 'ACCEPTED' },
        { label: '대기', value: 'PENDING' },
        { label: '거절', value: 'REJECTED' },
        { label: '취소됨', value: 'CANCELED' },
      ],
      value: filters.status,
      onChange: (value: string) =>
        setFilters((prev: ApplicationFiltersState) => ({
          ...prev,
          status: value,
        })),
    },
    {
      label: '정렬',
      options: [
        { label: '최신순', value: 'latest' },
        { label: '오래된순', value: 'oldest' },
      ],
      value: filters.sort,
      onChange: (value: string) =>
        setFilters((prev: ApplicationFiltersState) => ({
          ...prev,
          sort: value as ApplicationFiltersState['sort'],
        })),
    },
  ]

  return (
    <div className="mb-8 space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4 bg-white">
        <ApplicationSearchInput
          label={searchConfig.label}
          placeholder={searchConfig.placeholder}
          value={searchConfig.value}
          onChange={searchConfig.onChange}
        />

        {filter.map((e) => (
          <RecruitmentFilterSelect
            key={e.label}
            label={e.label}
            options={e.options}
            value={e.value}
            onChange={e.onChange}
          />
        ))}
      </div>
    </div>
  )
}
