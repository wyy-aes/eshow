import ReactECharts from 'echarts-for-react'
import ChartCard from '../../components/ChartCard'
import ChartContainer from '../../components/ChartContainer'
import { useIsMobile } from '../../hooks/useIsMobile'
import { kpiItems, alerts, forecastData } from '../../data/mockData'
import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

const statusColors = {
  good: { bg: 'bg-green-50', text: 'text-sigo-success', ring: 'ring-green-200' },
  warning: { bg: 'bg-orange-50', text: 'text-sigo-warning', ring: 'ring-orange-200' },
  danger: { bg: 'bg-red-50', text: 'text-sigo-danger', ring: 'ring-red-200' },
}

const levelConfig = {
  high: { icon: AlertTriangle, color: 'text-sigo-danger', bg: 'bg-red-50', label: '高' },
  medium: { icon: AlertCircle, color: 'text-sigo-warning', bg: 'bg-orange-50', label: '中' },
  low: { icon: Info, color: 'text-sigo-blue', bg: 'bg-blue-50', label: '低' },
}

export default function BusinessAlert() {
  const isMobile = useIsMobile()
  const gaugeHeight = isMobile ? 180 : 200
  const forecastHeight = isMobile ? 320 : 380

  const gaugeOption = (value: number, max: number, name: string) => ({
    series: [{
      type: 'gauge',
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max,
      splitNumber: 5,
      itemStyle: { color: value > max * 0.7 ? '#00B42A' : value > max * 0.4 ? '#FF7D00' : '#F53F3F' },
      progress: { show: true, width: isMobile ? 10 : 12 },
      pointer: { show: false },
      axisLine: { lineStyle: { width: isMobile ? 10 : 12, color: [[1, '#E8F3FF']] } },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { offsetCenter: [0, '70%'], fontSize: isMobile ? 11 : 12, color: '#666' },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '30%'],
        fontSize: isMobile ? 18 : 22,
        fontWeight: 'bold',
        formatter: (v: number) => `${v}`,
        color: '#0052D9',
      },
      data: [{ value, name }],
    }],
  })

  const forecastOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['当前库存', '30日预测销量', '建议补货'],
      bottom: 0,
      type: isMobile ? 'scroll' : 'plain',
      textStyle: { fontSize: isMobile ? 10 : 12 },
    },
    grid: { left: 44, right: 12, top: 20, bottom: isMobile ? 72 : 40 },
    xAxis: {
      type: 'category',
      data: forecastData.map((f) => f.name.replace(/日抛|月抛|半年抛/g, '')),
      axisLabel: { rotate: isMobile ? 45 : 30, fontSize: isMobile ? 9 : 10 },
    },
    yAxis: { type: 'value', name: '件', nameTextStyle: { fontSize: 10 } },
    series: [
      {
        name: '当前库存',
        type: 'bar',
        data: forecastData.map((f) => f.currentStock),
        itemStyle: { color: '#94BFFF', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: '30日预测销量',
        type: 'bar',
        data: forecastData.map((f) => f.forecast30d),
        itemStyle: { color: '#1677FF', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: '建议补货',
        type: 'bar',
        data: forecastData.map((f) => f.suggest),
        itemStyle: { color: '#FF7D00', borderRadius: [4, 4, 0, 0] },
      },
    ],
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {kpiItems.map((kpi) => {
          const style = statusColors[kpi.status]
          return (
            <div key={kpi.name} className={`rounded-xl p-3 md:p-4 ring-1 ${style.bg} ${style.ring}`}>
              <p className="text-[10px] md:text-xs text-gray-500 mb-1">{kpi.name}</p>
              <p className={`text-lg md:text-2xl font-bold ${style.text}`}>
                {kpi.value}<span className="text-xs md:text-sm font-normal ml-0.5">{kpi.unit}</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-1">{kpi.threshold}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <ChartCard title="库存周转率" subtitle="实时运营健康度">
          <ChartContainer height={gaugeHeight} mobileHeight={gaugeHeight}>
            <ReactECharts option={gaugeOption(8.2, 12, '次/年')} style={{ height: gaugeHeight }} />
          </ChartContainer>
        </ChartCard>
        <ChartCard title="缺货率" subtitle="低于警戒线需关注">
          <ChartContainer height={gaugeHeight} mobileHeight={gaugeHeight}>
            <ReactECharts option={gaugeOption(3.8, 10, '%')} style={{ height: gaugeHeight }} />
          </ChartContainer>
        </ChartCard>
        <ChartCard title="订单履约率" subtitle="发货与配送效率">
          <ChartContainer height={gaugeHeight} mobileHeight={gaugeHeight}>
            <ReactECharts option={gaugeOption(98.6, 100, '%')} style={{ height: gaugeHeight }} />
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <ChartCard title="异常预警列表" subtitle="AI自动检测的经营异常" aiBadge>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const config = levelConfig[alert.level]
              const Icon = config.icon
              return (
                <div key={alert.id} className={`flex gap-3 p-3 md:p-4 rounded-lg ${config.bg} border border-gray-100`}>
                  <Icon size={18} className={`${config.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                      <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alert.detail}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ChartCard>

        <ChartCard title="30日销量预测与备货建议" subtitle="AI需求预测 · 智能补货" aiBadge>
          <ChartContainer height={forecastHeight} mobileHeight={forecastHeight}>
            <ReactECharts option={forecastOption} style={{ height: forecastHeight }} />
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="rounded-xl bg-sigo-light border border-sigo-blue/20 p-4 md:p-5">
        <h3 className="text-sm font-semibold text-sigo-primary mb-3">AI备货建议摘要</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">紧急补货</p>
            <p className="font-bold text-sigo-danger mt-1">博士伦清朗日抛、拉拜诗小粉片</p>
            <p className="text-xs text-gray-400">库存不足7天安全线</p>
          </div>
          <div>
            <p className="text-gray-500">适量补货</p>
            <p className="font-bold text-sigo-warning mt-1">强生舒日、海昌星眸、可糖半年抛</p>
            <p className="text-xs text-gray-400">预测销量高于当前库存</p>
          </div>
          <div>
            <p className="text-gray-500">库存充足</p>
            <p className="font-bold text-sigo-success mt-1">moody小直径日抛、爱尔康水梯度</p>
            <p className="text-xs text-gray-400">无需补货，关注滞销风险</p>
          </div>
        </div>
      </div>
    </div>
  )
}
