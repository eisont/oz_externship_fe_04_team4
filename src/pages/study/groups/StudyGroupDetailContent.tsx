import { ExternalLink, User } from 'lucide-react'

import { StudyGroupStatusBadge } from '@/components/common/badge/StudyGroupStatusBadge'
import { formatDateTime } from '@/utils'

interface StudyGroupDetailContentProps {
  studyGroup: StudyGroupDetailProps
}

interface StudyGroupDetailProps {
  id: number
  name: string
  uuid: string
  profile_img_url: string
  current_headcount: number
  max_headcount: number
  status: string
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  lectures: {
    id: number
    title: string
    instructor: string
    profile_img_url: string
    url_link: string
  }[]
  members: { id: number; nickname: string; is_leader: boolean }[]
}

export function StudyGroupDetailContent({
  studyGroup,
}: StudyGroupDetailContentProps) {
  return (
    <div className="flex gap-8">
      <div className="w-96 shrink-0">
        <img
          src={
            studyGroup.profile_img_url ||
            'https://via.placeholder.com/384x216?text=No+Image'
          }
          alt={studyGroup.name}
          className="h-56 w-full rounded-lg object-cover"
        />

        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-500">그룹명</p>
            <p className="text-xl leading-tight font-semibold">
              {studyGroup.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">고유 ID</p>
              <p className="text-base font-medium">{studyGroup.id}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">UUID</p>
              <p className="text-base font-medium">{studyGroup.uuid || '-'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">인원 현황</p>
              <p className="text-base font-medium">
                {studyGroup.current_headcount} / {studyGroup.max_headcount}명
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">스터디 상태</p>
              <StudyGroupStatusBadge status={studyGroup.status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">스터디 시작일</p>
              <p className="text-base">{studyGroup.start_at}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">스터디 종료일</p>
              <p className="text-base">{studyGroup.end_at}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-sm text-gray-500">생성일시</p>
              <p className="text-base">
                {formatDateTime(studyGroup.created_at)}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">수정일시</p>
              <p className="text-base">
                {formatDateTime(studyGroup.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-700">
            멤버 목록
          </h3>
          <div className="space-y-2">
            {studyGroup.members && studyGroup.members.length > 0 ? (
              studyGroup.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <User className="h-5 w-5 shrink-0 text-gray-600" />
                  <span className="text-base text-gray-700">
                    {member.nickname}
                  </span>
                  {member.is_leader && (
                    <span className="ml-auto rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                      리더
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">멤버 정보가 없습니다.</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-700">
            스터디 강의 목록
          </h3>
          <div className="space-y-4">
            {studyGroup.lectures && studyGroup.lectures.length > 0 ? (
              studyGroup.lectures.map((lecture) => (
                <div key={lecture.id} className="flex gap-3">
                  <img
                    src={lecture.profile_img_url || 'Loading . . .'}
                    alt={lecture.title}
                    className="h-16 w-20 shrink-0 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-base font-medium">{lecture.title}</p>
                    <p className="text-sm text-gray-500">
                      강사: {lecture.instructor}
                    </p>
                    {lecture.url_link && (
                      <a
                        className="mt-1 flex items-center gap-1 text-sm text-yellow-600"
                        href={lecture.url_link}
                      >
                        강의 바로가기
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">강의 정보가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
