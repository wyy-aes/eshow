import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  height?: number
  mobileHeight?: number
  className?: string
}

export default function ChartContainer({
  children,
  height = 320,
  mobileHeight = 260,
  className = '',
}: Props) {
  return (
    <div
      className={`w-full overflow-x-auto -mx-1 px-1 ${className}`}
      style={{ minHeight: mobileHeight }}
    >
      <div className="min-w-[280px]" style={{ height }}>
        {children}
      </div>
    </div>
  )
}
