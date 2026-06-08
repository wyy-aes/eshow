import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  children: ReactNode
  aiBadge?: boolean
  className?: string
}

export default function ChartCard({ title, subtitle, children, aiBadge, className = '' }: Props) {
  return (
    <div className={`rounded-xl bg-white p-4 md:p-5 shadow-sm border border-gray-100 min-w-0 ${className}`}>
      <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
        <div className="min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{subtitle}</p>}
        </div>
        {aiBadge && (
          <span className="shrink-0 px-2 py-0.5 text-[10px] md:text-xs font-medium rounded-full bg-gradient-to-r from-sigo-primary to-sigo-blue text-white">
            AI 洞察
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
