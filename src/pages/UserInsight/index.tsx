import ReactECharts from 'echarts-for-react'
import ChartCard from '../../components/ChartCard'
import ChartContainer from '../../components/ChartContainer'
import { useIsMobile } from '../../hooks/useIsMobile'
import { rfmUsers, lifecycleFunnel, ltvPrediction, userTags } from '../../data/mockData'

const segmentColors: Record<string, string> = {
  '高价值用户': '#0052D9',
  '潜力用户': '#1677FF',
  '普通用户': '#36BFFA',
  '沉睡用户': '#FF7D00',
  '新客': '#00B42A',
}

export default function UserInsight() {
  const isMobile = useIsMobile()
  const chartHeight = isMobile ? 280 : 360
  const ltvHeight = isMobile ? 240 : 300

  const rfmOption = {
    tooltip: {
      trigger: 'item',
      formatter: (p: { data: number[]; seriesName: string }) =>
        `${p.seriesName}<br/>近购天数: ${p.data[0]}天<br/>购买频次: ${p.data[1]}次<br/>消费金额: ¥${p.data[2]}`,
    },
    legend: {
      data: Object.keys(segmentColors),
      bottom: 0,
      type: isMobile ? 'scroll' : 'plain',
      textStyle: { fontSize: isMobile ? 10 : 12 },
    },
    grid: { left: 48, right: 16, top: 24, bottom: isMobile ? 56 : 50 },
    xAxis: {
      name: isMobile ? '近购(天)' : '近购时间(天)',
      nameLocation: 'center',
      nameGap: 24,
      nameTextStyle: { fontSize: 10 },
      type: 'value',
      inverse: true,
    },
    yAxis: { name: '购买频次', nameTextStyle: { fontSize: 10 }, type: 'value' },
    series: Object.entries(
      rfmUsers.reduce<Record<string, typeof rfmUsers>>((acc, u) => {
        (acc[u.segment] ??= []).push(u)
        return acc
      }, {})
    ).map(([segment, users]) => ({
      name: segment,
      type: 'scatter',
      symbolSize: (data: number[]) => Math.sqrt(data[2]) / (isMobile ? 4 : 3),
      data: users.map((u) => [u.recency, u.frequency, u.monetary]),
      itemStyle: { color: segmentColors[segment], opacity: 0.8 },
    })),
  }

  const funnelOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
    series: [{
      type: 'funnel',
      left: isMobile ? '5%' : '10%',
      width: isMobile ? '90%' : '80%',
      sort: 'descending',
      gap: 4,
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}\n{c}人',
        fontSize: isMobile ? 10 : 12,
      },
      data: lifecycleFunnel.map((s) => ({
        name: s.stage,
        value: s.count,
      })),
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      color: ['#0052D9', '#1677FF', '#36BFFA', '#69B1FF', '#94BFFF'],
    }],
  }

  const ltvOption = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['高价值用户', '普通用户'],
      bottom: 0,
      textStyle: { fontSize: isMobile ? 10 : 12 },
    },
    grid: { left: 44, right: 12, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: ltvPrediction.map((d) => d.month) },
    yAxis: { type: 'value', name: 'LTV(元)', nameTextStyle: { fontSize: 10 } },
    series: [
      {
        name: '高价值用户',
        type: 'line',
        smooth: true,
        data: ltvPrediction.map((d) => d.highValue),
        lineStyle: { width: 3, color: '#0052D9' },
        itemStyle: { color: '#0052D9' },
        areaStyle: { color: 'rgba(0,82,217,0.1)' },
      },
      {
        name: '普通用户',
        type: 'line',
        smooth: true,
        data: ltvPrediction.map((d) => d.normal),
        lineStyle: { width: 2, color: '#94BFFF', type: 'dashed' },
        itemStyle: { color: '#94BFFF' },
      },
    ],
  }

  const tagFallback = (
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center min-h-[200px] md:h-[280px] py-4">
      {userTags.map((t) => (
        <span
          key={t.name}
          className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-sigo-light text-sigo-primary font-medium"
          style={{ fontSize: `${(isMobile ? 10 : 12) + t.weight / 8}px` }}
        >
          {t.name}
        </span>
      ))}
    </div>
  )

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <ChartCard title="RFM用户分群" subtitle="近购时间 × 购买频次 × 消费金额" aiBadge>
          <ChartContainer height={chartHeight} mobileHeight={chartHeight}>
            <ReactECharts option={rfmOption} style={{ height: chartHeight }} />
          </ChartContainer>
        </ChartCard>
        <ChartCard title="用户生命周期漏斗" subtitle="从访客到高忠诚用户转化路径">
          <ChartContainer height={chartHeight} mobileHeight={chartHeight}>
            <ReactECharts option={funnelOption} style={{ height: chartHeight }} />
          </ChartContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <ChartCard title="LTV生命周期价值预测" subtitle="未来12个月累计消费预测" aiBadge>
          <ChartContainer height={ltvHeight} mobileHeight={ltvHeight}>
            <ReactECharts option={ltvOption} style={{ height: ltvHeight }} />
          </ChartContainer>
          <p className="text-xs text-gray-400 mt-2 text-center">
            高价值用户12个月LTV预计达 ¥2,720，为普通用户6.9倍
          </p>
        </ChartCard>
        <ChartCard title="用户画像标签云" subtitle="基于行为与消费特征的群体标签">
          {tagFallback}
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(segmentColors).map(([segment, color]) => {
          const count = rfmUsers.filter((u) => u.segment === segment).length
          const totalSize = rfmUsers.filter((u) => u.segment === segment).reduce((s, u) => s + u.size, 0)
          return (
            <div key={segment} className="rounded-lg bg-white p-3 md:p-4 border border-gray-100 text-center">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: color }} />
              <p className="text-xs md:text-sm font-medium text-gray-700">{segment}</p>
              <p className="text-base md:text-lg font-bold text-sigo-primary mt-1">{totalSize}万</p>
              <p className="text-[10px] md:text-xs text-gray-400">{count}个聚类中心</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
