import { twClassName } from '@/utils/getTwClassName'

interface ApplicationStatusBadgeProps {
  status: string
  className?: string
}

type StatusProps = {
  desc: string
  style: string
}

const APPLICATION_STATUS_STYLES: Record<string, StatusProps> = {
  ACCEPTED: { desc: '승인', style: 'bg-green-100 text-green-700' },
  CANCELED: { desc: '취소됨', style: 'bg-yellow-100 text-yellow-700' },
  REJECTED: { desc: '거절', style: 'bg-red-100 text-red-700' },
  PENDING: { desc: '대기', style: 'bg-blue-100 text-blue-700' },
}

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  const baseClass = 'inline-block rounded px-2 py-1 text-xs'
  const statusData = APPLICATION_STATUS_STYLES[status] || {
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
