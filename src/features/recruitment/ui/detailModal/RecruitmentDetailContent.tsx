import clsx from 'clsx'
import {
  Bookmark,
  Eye,
  FileText,
  SquareArrowOutUpRight,
  User,
} from 'lucide-react'
import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { markdownToHtml } from '@/lib/markdown'
import { mockRecruitmentDetail } from '@/mocks/data/accounts'
import { sliceDateTime } from '@/utils/format'

const LEFT_BOX_STYLE = 'flex flex-col gap-1 mb-4 cursor-default'
const RIGHT_LEFT_BOX_STYLE = 'flex flex-col gap-1 mb-6 cursor-default'
const TEXT_STYLE = 'text-sm text-[#374151] cursor-default'

const status = {
  PENDING: (
    <div className="rounded-full bg-[#FEF9C3] px-2 py-1 text-[#854D0E]">
      검토중
    </div>
  ),
  ACCEPTED: (
    <div className="text-state-permission-txt rounded-full bg-[#DCFCE7] px-2 py-1">
      승인
    </div>
  ),
  CANCELED: (
    <div className="rounded-full bg-[#FEE2E2] px-2 py-1 text-[#991B1B]">
      거절
    </div>
  ),
  REJECTED: (
    <div className="rounded-full bg-[#DBEAFE] px-2 py-1 text-[#1E40AF]">
      대기
    </div>
  ),
}

export default function RecruitmentDetailContent() {
  const MD = mockRecruitmentDetail

  return (
    <div className="max-h-[676px] w-full overflow-scroll p-6">
      <div className="flex justify-between">
        {/* 왼쪽 */}
        <div className="w-[536px]">
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>고유 ID</div>
            <div className={TEXT_STYLE}>#{MD.id}</div>
          </div>
          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>UUID</div>
            <div className={TEXT_STYLE}>{MD.uuid}</div>
          </div>

          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 제목</div>
            <div className="text-primary-black text-lg font-bold">
              {MD.title}
            </div>
          </div>

          {/* 예상 모집 인원, 예상 결제 비용 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                예상 모집 인원
              </div>
              <div className={TEXT_STYLE}>{MD.expected_headcount}</div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                예상 결제 비용
              </div>
              <div className={TEXT_STYLE}>{MD.expected_payment_amount}원</div>
            </div>
          </div>

          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>마감 기한</div>
            <div className={TEXT_STYLE}>{sliceDateTime(MD.close_at, 10)}</div>
          </div>

          <div className={LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 상태</div>
            <div className={TEXT_STYLE}>{MD.is_closed ? '마감' : '모집중'}</div>
          </div>

          {/* 조회수, 북마크 순 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                조회수
              </div>
              <div
                className={twMerge(clsx('flex items-center', { TEXT_STYLE }))}
              >
                <Eye className="mr-1 w-4 text-[#9CA3AF]" />
                {MD.views_count}
              </div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                북마크 수
              </div>
              <div
                className={twMerge(clsx('flex items-center', { TEXT_STYLE }))}
              >
                <Bookmark className="mr-1 w-4 text-[#9CA3AF]" />
                {MD.bookmark_count}
              </div>
            </div>
          </div>

          {/* 공고 등록일시, 마지막 수정일시 */}
          <div className="flex justify-between">
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                공고 등록일시
              </div>
              <div className={TEXT_STYLE}>
                {sliceDateTime(MD.created_at, 16)}
              </div>
            </div>
            <div className={LEFT_BOX_STYLE}>
              <div className={twMerge(clsx('w-[260px]', { TEXT_STYLE }))}>
                마지막 수정일시
              </div>
              <div className={TEXT_STYLE}>
                {sliceDateTime(MD.updated_at, 16)}
              </div>
            </div>
          </div>

          {/* 사용자 정의 태그 */}
          <div className={'mb-4 flex flex-col gap-3'}>
            <div className={TEXT_STYLE}>사용자 정의 태그</div>
            <div className="flex items-center">
              {MD.tags.map((el) => (
                <div
                  key={el.id}
                  className="mr-2 cursor-default rounded-full bg-[#FEF9C3] px-3 py-1 text-[#854D0E]"
                >
                  {el.name}
                </div>
              ))}
            </div>
          </div>

          {/* 공고 첨푸 파일 */}
          <div className={'mb-4 flex flex-col gap-3'}>
            <div className={TEXT_STYLE}>사용자 정의 태그</div>
            <div className="flex flex-col">
              {MD.files.map((el) => (
                <div
                  key={el.id}
                  className="mb-2 flex w-full cursor-default items-center rounded-lg bg-[#F9FAFB] p-3 text-[#2563EB]"
                >
                  <FileText className="mr-2 w-5 text-[#9CA3AF]" />
                  {el.file_name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        {/* 공고 내용 */}
        <div className="w-[536px]">
          <div className={RIGHT_LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>공고 내용</div>
            <div
              className="text-custom-gray-900 remove-focus-outline markdown-content min-h-[200px] w-full list-inside rounded-lg border-0 bg-[#F9FAFB] p-4"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(MD.content.trim()),
              }}
              style={{ listStyle: 'decimal' }}
            />
          </div>

          {/* 스터디 강의 목록 */}
          <div className={RIGHT_LEFT_BOX_STYLE}>
            <div className={TEXT_STYLE}>스터디 강의 목록</div>
            {MD.lectures.map((el) => (
              <div key={el.id} className="rounded-lg bg-[#F9FAFB] p-4">
                <div className="flex">
                  <img
                    className="mr-4 h-14 w-20 rounded-md bg-amber-200"
                    src={el.thumbnail_img_url}
                    alt={el.thumbnail_img_url}
                  />
                  <div className="">
                    <div className="text-primary-black mb-1 text-sm font-semibold">
                      {el.title}
                    </div>
                    <div className="mb-1 text-[12px] text-[#4B5563]">
                      강사: {el.instructor}
                    </div>
                    <Link to={el.instructor} className="flex items-center">
                      <SquareArrowOutUpRight className="mr-1 w-3 text-[#CA8A04]" />
                      <div className="text-[12px] text-[#CA8A04]">
                        강의 바로가기
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 지원 내역 */}
          <div className="w-[536px]">
            <div className={RIGHT_LEFT_BOX_STYLE}>
              <div className={TEXT_STYLE}>
                지원 내역 ({MD.applications.length}명)
              </div>
              {MD.applications.map((el) => (
                <div
                  key={el.id}
                  className="flex items-center justify-center rounded-lg bg-[#F9FAFB] p-4"
                >
                  <div className="rounded-md bg-white p-3">
                    <div className="flex w-[480px] justify-between">
                      <div className="flex items-center">
                        <User className="mr-2 w-4" />
                        <div className="text-ms text-primary-black font-semibold">
                          {el.applicant.nickname}
                        </div>
                      </div>

                      {status[el.status]}
                    </div>

                    <div className="text-[12px] text-[#4B5563]">
                      이메일: {el.applicant.email}
                    </div>
                    <div className="text-[12px] text-[#4B5563]">
                      지원일시: {sliceDateTime(el.created_at, 16)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
