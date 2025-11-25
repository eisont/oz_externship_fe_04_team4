import { ChevronDown } from 'lucide-react'

export interface FilterOption {
  label: string
  value: string
}
interface FilterSelectProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function FilterSelect({
  options,
  value,
  onChange,
  placeholder = 'Select',
}: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focust:ring-1 w-40 appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-8 pl-3 text-sm focus:ring-blue-500 focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  )
}
