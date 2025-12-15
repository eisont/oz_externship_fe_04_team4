import { twClassName } from '@/utils/getTwClassName'

interface DifficultyBadgeProps {
  difficulty?: string
  className?: string
}

const DIFFICULTY_CONFIG: Record<string, { desc: string; style: string }> = {
  HARD: { desc: '어려움', style: 'bg-red-100 text-red-700' },
  NORMAL: { desc: '보통', style: 'bg-yellow-100 text-yellow-700' },
  EASY: { desc: '쉬움', style: 'bg-green-100 text-green-700' },
}

export function DifficultyBadge({
  difficulty,
  className,
}: DifficultyBadgeProps) {
  const baseClass = 'inline-block rounded px-2 py-1 text-sm'

  const { desc, style } = DIFFICULTY_CONFIG[difficulty || ''] || {
    desc: '-',
    style: 'bg-gray-100 text-gray-700',
  }

  return (
    <span className={twClassName(baseClass, style, className)}>{desc}</span>
  )
}
