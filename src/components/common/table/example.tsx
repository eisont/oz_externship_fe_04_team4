import { Table } from '@/components/common/table/Table'
import { useState } from 'react'

const exampleData = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  nickname: `user00${i + 1}`,
  name: `사용자${i + 1}`,
  status: i === 3 ? '비활성' : '활성',
  joinDate: '2023. 1. 15.',
  role: 'user',
  birthday: '2025-11-20',
  withdraw_at: '2025-10-30T14:01:57.505250+09:00',
  created_at: '2025-10-30T14:01:57.505250+09:00',
}))

const columns = [
  { key: 'id', header: '회원 ID', width: '100px' },
  { key: 'email', header: '이메일', width: '200px' },
  { key: 'nickname', header: '닉네임', width: '120px' },
  { key: 'name', header: '이름', width: '100px' },
  { key: 'birthday', header: '생년월일', width: '120px' },
  { key: 'role', header: '권한', width: '100px' },
  {
    key: 'status',
    header: '상태',
    width: '80px',
    render: (value: string) => (
      <span
        className={`inline-block rounded-full px-2 py-1 text-xs ${
          value === '활성'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: 'joinDate', header: '가입일', width: '120px' },
]
export default function ExampleTable() {
  const [currentPage, setCurrentPage] = useState(1)
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
  return (
    <div className="space-y-4 p-6">
      <Table
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        columns={columns}
        response={exampleResponse}
      />
    </div>
  )
}
