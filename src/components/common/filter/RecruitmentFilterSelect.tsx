import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

interface FilterOption {
  label: string
  value: string
}

interface FilterSelectProps {
  className?: string
  label?: string
  labelClassName?: string
  selectClassName?: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RecruitmentFilterSelect({
  className,
  label,
  labelClassName,
  selectClassName,
  options,
  value,
  onChange,
  placeholder = '전체',
}: FilterSelectProps) {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2', className))}>
      {label && (
        <label
          className={twMerge(
            clsx('font-base text-sm text-[#374151]', labelClassName)
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={twMerge(
            clsx(
              'h-[38px] w-full appearance-none rounded-lg border border-[#D1D5DB] px-3 py-2 outline-0',
              selectClassName
            )
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
