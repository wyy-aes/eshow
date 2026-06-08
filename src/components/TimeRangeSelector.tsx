import type { TimeRange } from '../data/types'

interface Props {
  value: TimeRange
  onChange: (value: TimeRange) => void
}

const options: { value: TimeRange; label: string }[] = [
  { value: '7d', label: '近7天' },
  { value: '30d', label: '近30天' },
  { value: '90d', label: '近90天' },
]

export default function TimeRangeSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-0.5 bg-gray-100 rounded-lg p-0.5 md:p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md transition-colors ${
            value === opt.value
              ? 'bg-white text-sigo-primary font-medium shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
