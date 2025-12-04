import dayjs from 'dayjs'

import TagFilterPreview from '@/components/common/tag/TagFilterPreview'
import type { RecruitmentTag } from '@/mocks/types/accounts'

export const RecruitmentColumns = [
  { key: 'id', header: 'ID', width: '10px' },
  { key: 'title', header: '공고 제목', width: '400px' },
  {
    key: 'tags',
    header: '태그',
    width: '100px',
    render: (row: RecruitmentTag[]) => {
      const tags = row

      return (
        <div className="flex flex-wrap gap-1">
          <TagFilterPreview tags={tags} koreanLength={16} englishLength={30} />
        </div>
      )
    },
  },
  {
    key: 'close_at',
    header: '마감 기한',
    width: '100px',
    render: (row: string) => dayjs(row).format('YYYY-MM-DD'),
  },
  {
    key: 'is_closed',
    header: '상태',
    width: '100px',
    render: (row: boolean) => (
      <div className="flex items-center">
        {row ? (
          <div className="rounded-full bg-[#F3F4F6] px-2 py-1 text-xs text-[#1F2937]">
            마감
          </div>
        ) : (
          <div className="text-state-permission-txt rounded-full bg-[#DCFCE7] px-2 py-1 text-xs">
            모집중
          </div>
        )}
      </div>
    ),
  },
  {
    key: 'views_count',
    header: '조회수',
    width: '10px',
  },
  {
    key: 'bookmark_count',
    header: '북마크',
    width: '10px',
  },
  {
    key: 'created_at',
    header: '생성일시',
    width: '100px',
    sortable: { asc: 'created_asc', desc: 'created_desc' },
    render: (row: string) => dayjs(row).format('YYYY-MM-DD HH:mm'),
  },
  {
    key: 'updated_at',
    header: '수정일시',
    width: '100px',
    render: (row: string) => dayjs(row).format('YYYY-MM-DD HH:mm'),
  },
]
