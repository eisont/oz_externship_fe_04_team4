export const STATUS = {
  active: 'active',
  inactive: 'inactive',
} as const

export const STATUS_LABEL = {
  active: '활성',
  inactive: '비활성',
} as const

export type StatusType = (typeof STATUS)[keyof typeof STATUS]

export const STATUS_STYLE = {
  active: 'bg-[#DCFCE7] text-[#166534]',
  inactive: 'bg-[#F3F4F6] text-[#374151]',
} as const
