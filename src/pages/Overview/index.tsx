import ReactECharts from 'echarts-for-react'
import MetricCard from '../../components/MetricCard'
import ChartCard from '../../components/ChartCard'
import ChartContainer from '../../components/ChartContainer'
import ValueBanner from '../../components/ValueBanner'
import { useIsMobile } from '../../hooks/useIsMobile'
import { overviewMetrics, gmvTrend, dataSources, valuePropositions } from '../../data/mockData'

const brandColors = ['#0052D9', '#1677FF', '#36BFFA', '#00B42A', '#FF7D00']

export default function Overview() {
  const isMobile = useIsMobile()
  const chartHeight = isMobile ? 260 : 320

  const gmvOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['强生安视优', '博士伦', '海昌', '爱尔康', 'moody'],
      bottom: 0,
      type: isMobile ? 'scroll' : 'plain',
      textStyle: { fontSize: isMobile ? 10 : 12 },
    },
    grid: { left: 40, right: 12, top: 20, bottom: isMobile ? 56 : 40 },
    xAxis: {
      type: 'category',
      data: gmvTrend.map((d) => d.date),
      boundaryGap: false,
      axisLabel: { fontSize: isMobile ? 10 : 12, interval: isMobile ? 4 : 2 },
    },
    yAxis: { type: 'value', name: '万元', nameTextStyle: { fontSize: 10 } },
    series: ['强生安视优', '博士伦', '海昌', '爱尔康', 'moody'].map((brand, i) => ({
      name: brand,
      type: 'line',
      smooth: true,
      data: gmvTrend.map((d) => d[brand]),
      lineStyle: { width: isMobile ? 1.5 : 2 },
      itemStyle: { color: brandColors[i] },
      showSymbol: !isMobile,
      areaStyle: i === 0 ? { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
        { offset: 0, color: 'rgba(0,82,217,0.15)' },
        { offset: 1, color: 'rgba(0,82,217,0)' },
      ]}} : undefined,
    })),
  }

  const sourceOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
    legend: {
      orient: isMobile ? 'horizontal' : 'vertical',
      right: isMobile ? 'center' : 10,
      top: isMobile ? 'bottom' : 'center',
      bottom: isMobile ? 0 : undefined,
      textStyle: { fontSize: isMobile ? 10 : 12 },
    },
    series: [{
      type: 'pie',
      radius: isMobile ? ['38%', '58%'] : ['45%', '70%'],
      center: isMobile ? ['50%', '42%'] : ['40%', '50%'],
      data: dataSources.map((d) => ({ name: d.name, value: d.value })),
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      color: ['#0052D9', '#1677FF', '#36BFFA', '#94BFFF'],
    }],
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-xl bg-gradient-to-r from-sigo-primary to-sigo-blue p-4 md:p-6 text-white">
        <h2 className="text-base md:text-xl font-bold mb-1 leading-snug">
          用AI激活数据价值，驱动生意持续增长
        </h2>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed">
          连接全域数据资产 · 洞察用户价值 · 优化投放效率 · 提升经营效益
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {overviewMetrics.map((m) => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <ChartCard title="30日GMV趋势" subtitle="分品牌销售额（万元）" className="lg:col-span-2">
          <ChartContainer height={chartHeight} mobileHeight={chartHeight}>
            <ReactECharts option={gmvOption} style={{ height: chartHeight }} />
          </ChartContainer>
        </ChartCard>
        <ChartCard title="数据资产来源分布" subtitle="全域数据资产构成">
          <ChartContainer height={chartHeight} mobileHeight={chartHeight}>
            <ReactECharts option={sourceOption} style={{ height: chartHeight }} />
          </ChartContainer>
        </ChartCard>
      </div>

      <ValueBanner items={valuePropositions} />

      <div className="rounded-xl bg-sigo-light border border-sigo-blue/20 p-4 md:p-5 text-center">
        <p className="text-xs md:text-sm text-sigo-primary font-medium leading-relaxed">
          让数据产生洞察，让洞察驱动行动，让行动带来增长 —— 让每一份数据都产生价值，让每一个决策都有据可依，让每一个客户都更有价值
        </p>
      </div>
    </div>
  )
}
