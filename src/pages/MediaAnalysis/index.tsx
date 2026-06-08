import ReactECharts from 'echarts-for-react'
import ChartCard from '../../components/ChartCard'
import AIBadge from '../../components/AIBadge'
import { channelROI, conversionFunnels, heatmapData, mediaInsights } from '../../data/mockData'

export default function MediaAnalysis() {
  const roiOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['投放花费', '成交金额', 'ROI'], bottom: 0 },
    grid: { left: 50, right: 50, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: channelROI.map((c) => c.channel) },
    yAxis: [
      { type: 'value', name: '万元', position: 'left' },
      { type: 'value', name: 'ROI', position: 'right', min: 0, max: 6 },
    ],
    series: [
      {
        name: '投放花费',
        type: 'bar',
        data: channelROI.map((c) => c.spend),
        itemStyle: { color: '#94BFFF', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: '成交金额',
        type: 'bar',
        data: channelROI.map((c) => c.revenue),
        itemStyle: { color: '#0052D9', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: 'ROI',
        type: 'line',
        yAxisIndex: 1,
        data: channelROI.map((c) => c.roi),
        lineStyle: { width: 3, color: '#FF7D00' },
        itemStyle: { color: '#FF7D00' },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  }

  const funnelChannels = conversionFunnels.map((c) => c.channel)
  const funnelOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['曝光', '点击', '加购', '支付'], bottom: 0 },
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: { type: 'category', data: funnelChannels },
    yAxis: { type: 'value', name: '人数' },
    series: [
      { name: '曝光', type: 'bar', stack: 'total', data: conversionFunnels.map((c) => c.exposure), itemStyle: { color: '#E8F3FF' } },
      { name: '点击', type: 'bar', stack: 'total', data: conversionFunnels.map((c) => c.click), itemStyle: { color: '#94BFFF' } },
      { name: '加购', type: 'bar', stack: 'total', data: conversionFunnels.map((c) => c.cart), itemStyle: { color: '#36BFFA' } },
      { name: '支付', type: 'bar', data: conversionFunnels.map((c) => c.pay), itemStyle: { color: '#0052D9', borderRadius: [4, 4, 0, 0] } },
    ],
  }

  const weeks = [...new Set(heatmapData.map((d) => d.week))]
  const channels = [...new Set(heatmapData.map((d) => d.channel))]
  const heatmapOption = {
    tooltip: { position: 'top', formatter: (p: { data: number[] }) => {
      const [ci, wi, val] = p.data
      return `${channels[ci]} / ${weeks[wi]}<br/>转化指数: ${val}`
    }},
    grid: { left: 60, right: 20, top: 10, bottom: 30 },
    xAxis: { type: 'category', data: weeks, splitArea: { show: true } },
    yAxis: { type: 'category', data: channels, splitArea: { show: true } },
    visualMap: {
      min: 40, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: 0,
      inRange: { color: ['#E8F3FF', '#1677FF', '#0052D9'] },
      text: ['高', '低'],
      textStyle: { fontSize: 11 },
    },
    series: [{
      type: 'heatmap',
      data: heatmapData.map((d) => [weeks.indexOf(d.week), channels.indexOf(d.channel), d.value]),
      label: { show: true, fontSize: 11 },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' } },
    }],
  }

  const conversionRates = conversionFunnels.map((c) => ({
    channel: c.channel,
    clickRate: ((c.click / c.exposure) * 100).toFixed(2),
    cartRate: ((c.cart / c.click) * 100).toFixed(2),
    payRate: ((c.pay / c.cart) * 100).toFixed(2),
    overallRate: ((c.pay / c.exposure) * 100).toFixed(3),
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="渠道ROI对比" subtitle="各平台投放花费、成交金额与ROI（万元）">
          <ReactECharts option={roiOption} style={{ height: 340 }} />
        </ChartCard>
        <ChartCard title="渠道转化漏斗" subtitle="曝光 → 点击 → 加购 → 支付">
          <ReactECharts option={funnelOption} style={{ height: 340 }} />
        </ChartCard>
      </div>

      <ChartCard title="投放转化热力图" subtitle="按周 × 渠道的转化效率指数">
        <ReactECharts option={heatmapOption} style={{ height: 280 }} />
      </ChartCard>

      <div className="grid grid-cols-5 gap-3">
        {conversionRates.map((c) => (
          <div key={c.channel} className="rounded-lg bg-white p-4 border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">{c.channel}</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>点击率 <span className="text-sigo-primary font-medium">{c.clickRate}%</span></p>
              <p>加购率 <span className="text-sigo-primary font-medium">{c.cartRate}%</span></p>
              <p>支付率 <span className="text-sigo-primary font-medium">{c.payRate}%</span></p>
              <p className="pt-1 border-t">总转化率 <span className="text-sigo-warning font-bold">{c.overallRate}%</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-800">AI投放优化建议</h3>
          <AIBadge />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mediaInsights.map((insight) => (
            <div key={insight.title} className="rounded-xl bg-white p-5 border border-sigo-blue/20 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">{insight.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{insight.content}</p>
              <p className="text-xs font-medium text-sigo-success bg-green-50 rounded-lg px-3 py-1.5 inline-block">
                {insight.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
