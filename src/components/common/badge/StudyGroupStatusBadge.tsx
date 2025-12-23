import { twClassName } from '@/utils/getTwClassName'

interface StudyGroupStatusBadgeProps {
  status: string
  className?: string
}
type StatusProps = {
  desc: string
  style: string
}

const STUDY_GROUP_STYLES: Record<string, StatusProps> = {
  PENDING: { desc: '대기중', style: 'bg-blue-100 text-blue-700' },
  ENDED: { desc: '종료됨', style: 'bg-gray-100 text-gray-700' },
  ONGOING: { desc: '진행중', style: 'bg-green-100 text-green-700' },
}

export function StudyGroupStatusBadge({
  status,
  className,
}: StudyGroupStatusBadgeProps) {
  const baseClass = 'inline-block rounded-full px-2 py-1 text-xs'
  const statusData = STUDY_GROUP_STYLES[status] || {
    desc: '-',
    style: 'bg-gray-100 text-gray-700',
  }
  const statusStyle = statusData.style
  const statusDesc = statusData.desc

  return (
    <span className={twClassName(baseClass, statusStyle, className)}>
      {statusDesc}
    </span>
  )
}
