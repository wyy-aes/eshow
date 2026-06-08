import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Sparkles,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import TimeRangeSelector from '../components/TimeRangeSelector'
import type { TimeRange } from '../data/types'

const navItems = [
  { path: '/', label: '数据总览', shortLabel: '总览', icon: LayoutDashboard },
  { path: '/user-insight', label: '用户洞察', shortLabel: '用户', icon: Users },
  { path: '/media-analysis', label: '投放分析', shortLabel: '投放', icon: BarChart3 },
  { path: '/ai-recommend', label: '智能推荐', shortLabel: '推荐', icon: Sparkles },
  { path: '/business-alert', label: '经营预警', shortLabel: '预警', icon: AlertTriangle },
]

const breadcrumbMap: Record<string, string> = {
  '/': '数据总览',
  '/user-insight': '用户洞察与分群',
  '/media-analysis': '媒体投放分析',
  '/ai-recommend': '智能推荐与营销',
  '/business-alert': '经营分析与预警',
}

export default function MainLayout() {
  const location = useLocation()
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const currentPage = breadcrumbMap[location.pathname] || '数据总览'

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex w-56 bg-sigo-primary text-white flex-col fixed h-full z-10">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-sm">
              S
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">SIGO 数据智能</h1>
              <p className="text-[10px] text-white/60">视客眼镜网 · AI分析平台</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-[10px] text-white/40 leading-relaxed">
            用AI激活数据价值<br />驱动生意持续增长
          </p>
        </div>
      </aside>

      <main className="flex-1 md:ml-56 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 min-w-0">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 md:px-6 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span className="shrink-0">SIGO 数据智能分析系统</span>
                <ChevronRight size={14} className="shrink-0" />
                <span className="text-gray-800 font-medium truncate">{currentPage}</span>
              </div>
              <p className="sm:hidden text-sm font-medium text-gray-800 truncate">{currentPage}</p>
            </div>
            <div className="shrink-0 self-start sm:self-auto">
              <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          <Outlet context={{ timeRange }} />
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] transition-colors ${
                  isActive ? 'text-sigo-primary font-medium' : 'text-gray-400'
                }`
              }
            >
              <item.icon size={20} strokeWidth={1.75} />
              <span>{item.shortLabel}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
