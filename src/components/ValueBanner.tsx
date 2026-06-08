import { Users, Target, TrendingUp, Package, Brain } from 'lucide-react'
import type { ValueProposition } from '../data/types'

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={20} />,
  target: <Target size={20} />,
  trending: <TrendingUp size={20} />,
  package: <Package size={20} />,
  brain: <Brain size={20} />,
}

interface Props {
  items: ValueProposition[]
}

export default function ValueBanner({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl bg-gradient-to-br from-sigo-primary to-sigo-blue p-4 text-white"
        >
          <div className="flex items-center gap-2 mb-2 opacity-90">
            {iconMap[item.icon]}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          <p className="text-base md:text-lg font-bold">{item.target}</p>
        </div>
      ))}
    </div>
  )
}
