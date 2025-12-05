import clsx from 'clsx'
import { Search } from 'lucide-react'

import { useDeferredValue, useEffect, useRef, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import type { SearchConfig } from '@/components/common/filter/types'

export function ApplicationSearchInput({
  className,
  label = '검색',
  labelClassName,
  searchClassName,
  inputClassName,
  placeholder,
  value,
  onChange,
}: SearchConfig) {
  const [localValue, setLocalValue] = useState(value)
  const debounceValue = useDeferredValue(localValue)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    onChangeRef.current(debounceValue)
  }, [debounceValue])

  return (
    <div className={twMerge(clsx('flex flex-col gap-2', className))}>
      {label && (
        <label
          className={twMerge(clsx('text-sm text-[#374151]', labelClassName))}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          clsx(
            'flex h-[38px] w-full items-center rounded-lg border border-[#D1D5DB] bg-white p-3 text-sm',
            searchClassName
          )
        )}
      >
        <Search className="mr-3 w-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className={twMerge(clsx('w-full text-sm outline-0', inputClassName))}
        />
      </div>
    </div>
  )
}
