import { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import ChartCard from '../../components/ChartCard'
import AIBadge from '../../components/AIBadge'
import { userProfiles, recommendations, marketingContents, similarityMatrix } from '../../data/mockData'

export default function AIRecommend() {
  const [selectedUser, setSelectedUser] = useState(userProfiles[0].id)
  const profile = userProfiles.find((u) => u.id === selectedUser)!
  const recs = recommendations[selectedUser] || []

  const brands = [...new Set(similarityMatrix.map((s) => s.brand))]
  const categories = [...new Set(similarityMatrix.map((s) => s.category))]

  const heatmapOption = {
    tooltip: { position: 'top' },
    grid: { left: 70, right: 20, top: 10, bottom: 50 },
    xAxis: { type: 'category', data: categories, splitArea: { show: true } },
    yAxis: { type: 'category', data: brands, splitArea: { show: true } },
    visualMap: {
      min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center', bottom: 0,
      inRange: { color: ['#F5F7FA', '#1677FF', '#0052D9'] },
    },
    series: [{
      type: 'heatmap',
      data: similarityMatrix.map((s) => [
        categories.indexOf(s.category),
        brands.indexOf(s.brand),
        s.value,
      ]),
      label: { show: true, fontSize: 10 },
    }],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <ChartCard title="选择用户画像" subtitle="模拟不同用户群体的AI推荐">
            <div className="space-y-2">
              {userProfiles.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUser(u.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedUser === u.id
                      ? 'border-sigo-primary bg-sigo-light'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sigo-primary text-white flex items-center justify-center text-sm font-medium">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{u.name} · {u.age}岁 · {u.gender}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {u.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ChartCard>

          <div className="rounded-xl bg-white p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-800">当前画像标签</h3>
              <AIBadge text="AI识别" />
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-sigo-light text-sigo-primary font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ChartCard title="AI个性化商品推荐" subtitle={`为 ${profile.name} 推荐的 TOP 5 SKU`} aiBadge className="col-span-2">
          <div className="space-y-3">
            {recs.map((rec, i) => (
              <div key={rec.sku} className="flex items-center gap-4 p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-sigo-primary text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">{rec.name}</p>
                    <span className="text-xs text-gray-400">{rec.brand}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{rec.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-sigo-primary">¥{rec.price}</p>
                  <p className="text-xs text-sigo-success">匹配度 {rec.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="营销内容智能生成" subtitle={`为「${profile.age}岁${profile.gender}性/${profile.tags[0]}」生成的触达文案`} aiBadge>
          <div className="space-y-4">
            {marketingContents.map((mc) => (
              <div key={mc.channel} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-sigo-primary text-white">{mc.channel}</span>
                  <span className="text-xs text-gray-500">{mc.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{mc.content}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="商品协同过滤热图" subtitle="品牌 × 品类 关联购买相似度">
          <ReactECharts option={heatmapOption} style={{ height: 320 }} />
        </ChartCard>
      </div>
    </div>
  )
}
