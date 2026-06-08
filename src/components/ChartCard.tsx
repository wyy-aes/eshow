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
    <div className={`rounded-xl bg-white p-5 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {aiBadge && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-sigo-primary to-sigo-blue text-white">
            AI 洞察
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
