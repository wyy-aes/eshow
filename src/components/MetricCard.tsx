import { TrendingUp, TrendingDown } from 'lucide-react'
import type { MetricCard as MetricCardType } from '../data/types'

interface Props {
  metric: MetricCardType
}

export default function MetricCard({ metric }: Props) {
  const isPositive = metric.change >= 0
  const invertColor = metric.label === '平均客单价'

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
      <div className="flex items-end gap-1">
        {metric.unit === '亿' || metric.unit === '万' ? (
          <>
            <span className="text-2xl font-bold text-sigo-primary">{metric.value}</span>
            <span className="text-sm text-gray-500 mb-1">{metric.unit}</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-bold text-sigo-primary">
              {metric.unit === '元' ? `¥${metric.value}` : metric.value}
            </span>
            {metric.unit && metric.unit !== '元' && (
              <span className="text-sm text-gray-500 mb-1">{metric.unit}</span>
            )}
          </>
        )}
      </div>
      <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive !== invertColor ? 'text-sigo-success' : 'text-sigo-danger'}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{isPositive ? '+' : ''}{metric.change}% 同比</span>
      </div>
    </div>
  )
}
