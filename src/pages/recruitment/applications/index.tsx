import clsx from 'clsx'
import { ListFilter } from 'lucide-react'
import { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { FilterSelect, SearchInput } from '@/components/common/filter'
import Modal from '@/components/common/Modal'
import SelectedTagList from '@/components/common/modal/applications/SelectedTagList'
import TagFilterActionButtons from '@/components/common/modal/applications/TagFilterActionButtons'
import TagOptionList from '@/components/common/modal/applications/TagOptionList'
import TagSearchInput from '@/components/common/modal/applications/TagSearchInput'
import { Table, type SortConfig } from '@/components/common/table'

const LABEL_STYLE = 'text-sm text-[#374151]'
const BOX_STYLE = 'w-[256px] h-9 focus:ring-0 focus:border-0'

// =================== Table ========================

const exampleData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `user${i + 1}@example.com`,
  tags: `user00${i + 1}`,
  closedAt: '2023. 1. 15.',
  status: i === 3 ? '마감' : '모집중',
  role: 'user',
  view: 2,
  bookMark: 2,
  createdAt: '2025-10-30T14:01:57.505250+09:00',
  updatedAt: '2025-10-30T14:01:57.505250+09:00',
}))

const columns = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'title', header: '공고 제목', width: '250px' },
  { key: 'tags', header: '태그', width: '150px' },
  {
    key: 'closedAt',
    header: '마감 기한',
    width: '100px',
  },
  {
    key: 'status',
    header: '상태',
    width: '80px',
    render: (value: string) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs ${
          value === '모집중'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'view',
    header: '조회수',
    width: '80px',
    sortable: { asc: 'oldest', desc: 'latest' },
  },
  {
    key: 'bookMark',
    header: '북마크',
    width: '80px',
    sortable: { asc: 'closed_asc', desc: 'closed_desc' },
  },
  {
    key: 'createdAt',
    header: '생성일시',
    width: '100px',
    sortable: { asc: 'closed_asc', desc: 'closed_desc' },
  },
  {
    key: 'updatedAt',
    header: '수정일시',
    width: '100px',
    sortable: { asc: 'closed_asc', desc: 'closed_desc' },
  },
]

export default function RecruitmentApplicationsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('')
  const [queryParams, setQueryParams] = useState({
    page: 1,
    page_size: 10,
    search: '',
    role: '',
    sort: '',
  })
  useEffect(() => {
    setQueryParams((prev) => {
      return { ...prev, search, role, status, page: 1 }
    })
  }, [search, status, role])

  // =================== Table =========================
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  // 페이지네이션 테스트 용 데이터 슬라이스(실제론 API에서 results에 10개씩만 들어있음)
  const startIndex = (currentPage - 1) * 10
  const endIndex = startIndex + 10
  const currentPageData = exampleData.slice(startIndex, endIndex)
  const exampleResponse = {
    count: exampleData.length,
    next: currentPage < 10 ? `...?page=${currentPage + 1}` : null,
    previous: currentPage > 1 ? `...?page=${currentPage - 1}` : null,
    results: currentPageData,
  }
  const handleSort = (
    sortValue: string,
    direction: 'asc' | 'desc',
    key: string
  ) => {
    if (sortValue === '') {
      // 정렬 해제
      setSortConfig(null)
      setQueryParams((prev) => ({ ...prev, sort: '', page: 1 }))
    } else {
      setSortConfig({ key, value: sortValue, direction })
      setQueryParams((prev) => ({
        ...prev,
        sort: sortValue,
        page: 1,
      }))
    }
    setCurrentPage(1)

    // API 호출
    // fetchUsers(queryParams)
  }

  return (
    <>
      <Modal
        isOpen={open}
        title="태그 필터 선택"
        contentClassName="p-0"
        footer={<TagFilterActionButtons setOpen={setOpen} />}
        footerClassName="p-0"
        topCloseButton
        onClose={() => setOpen(false)}
      >
        <TagSearchInput />
        <SelectedTagList />
        <TagOptionList />
      </Modal>
      <div className="mb-6 space-y-4 rounded-lg bg-white p-6">
        <div className="flex items-center">
          <SearchInput
            className="mr-4"
            labelClassName={LABEL_STYLE}
            searchClassName={BOX_STYLE}
            inputClassName="outline-0 focus:ring-0 focus:border-gray-300"
            placeholder="공고명 검색"
            value={search}
            onChange={setSearch}
          />
          <FilterSelect
            className="mr-4"
            key={status}
            label="공고 상태"
            labelClassName={LABEL_STYLE}
            selectClassName={BOX_STYLE}
            options={[
              { label: '모집중', value: 'open' },
              { label: '마감', value: 'close' },
            ]}
            value={status}
            onChange={setStatus}
            placeholder="전체"
          />
          <div className="flex flex-col">
            <div
              className={twMerge(
                clsx('mb-2 text-sm font-medium text-[##374151]')
              )}
            >
              태그 필터
            </div>
            <div
              onClick={() => setOpen(true)}
              className={twMerge(
                clsx(
                  'flex cursor-pointer items-center justify-between rounded-lg border border-[#D1D5DB] px-3 py-2',
                  BOX_STYLE
                )
              )}
            >
              <div className="text-sm text-[#374151]">태그 입력</div>
              <ListFilter className="w-4 text-[#9CA3AF]" />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Table
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          columns={columns}
          response={exampleResponse}
          // isLoading
          // error={'error'}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </>
  )
}
