import type {
  MetricCard,
  Brand,
  Channel,
  RFMUser,
  FunnelStage,
  LTVPoint,
  TagItem,
  ChannelROI,
  ConversionFunnel,
  HeatmapCell,
  AIInsight,
  UserProfile,
  ProductRecommendation,
  MarketingContent,
  SimilarityItem,
  KPIItem,
  AlertItem,
  ForecastItem,
  GMVTrend,
  DataSource,
  ValueProposition,
} from './types'

export const brands: Brand[] = [
  { id: 'jj', name: '强生安视优', category: '隐形眼镜' },
  { id: 'bausch', name: '博士伦', category: '隐形眼镜' },
  { id: 'haichang', name: '海昌', category: '美瞳' },
  { id: 'alcon', name: '爱尔康', category: '隐形眼镜' },
  { id: 'moody', name: 'moody', category: '美瞳' },
  { id: 'cofancy', name: '可糖', category: '美瞳' },
  { id: 'lapecher', name: '拉拜诗', category: '美瞳' },
]

export const channels: Channel[] = [
  { id: 'taobao', name: '淘宝旗舰店' },
  { id: 'jd', name: '京东自营' },
  { id: 'douyin', name: '抖音小店' },
  { id: 'xiaohongshu', name: '小红书' },
  { id: 'app', name: '自营APP' },
]

export const overviewMetrics: MetricCard[] = [
  { label: '年GMV', value: '25.8', change: 23.6, unit: '亿' },
  { label: '注册用户', value: '320', change: 12.4, unit: '万' },
  { label: '月活跃用户', value: '48', change: 8.7, unit: '万' },
  { label: '复购率', value: '38.2', change: 5.3, unit: '%' },
  { label: '平均客单价', value: '186', change: -2.1, unit: '元' },
  { label: '投放ROI', value: '3.2', change: 15.8, unit: 'x' },
]

export const valuePropositions: ValueProposition[] = [
  { title: '提升用户价值', target: '用户LTV +15~30%', icon: 'users' },
  { title: '优化投放效率', target: '获客成本 -20~40%', icon: 'target' },
  { title: '提升转化销售', target: '转化率 +10~25%', icon: 'trending' },
  { title: '优化库存供应链', target: '库存成本 -15~30%', icon: 'package' },
  { title: '数据驱动决策', target: '决策效率提升 50%+', icon: 'brain' },
]

function generateGMVTrend(): GMVTrend[] {
  const dates: GMVTrend[] = []
  const brandKeys = ['强生安视优', '博士伦', '海昌', '爱尔康', 'moody']
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const date = `${d.getMonth() + 1}/${d.getDate()}`
    const row: GMVTrend = { date }
    brandKeys.forEach((b, idx) => {
      const base = [420, 380, 290, 350, 260][idx]
      row[b] = Math.round(base + Math.sin(i * 0.3 + idx) * 40 + Math.random() * 30)
    })
    dates.push(row)
  }
  return dates
}

export const gmvTrend = generateGMVTrend()

export const dataSources: DataSource[] = [
  { name: 'C端用户数据', value: 38 },
  { name: '媒体投放数据', value: 28 },
  { name: '电商运营数据', value: 24 },
  { name: '其他业务数据', value: 10 },
]

export const rfmUsers: RFMUser[] = [
  { id: '1', recency: 5, frequency: 12, monetary: 3200, segment: '高价值用户', size: 45 },
  { id: '2', recency: 8, frequency: 10, monetary: 2800, segment: '高价值用户', size: 38 },
  { id: '3', recency: 12, frequency: 8, monetary: 2100, segment: '潜力用户', size: 32 },
  { id: '4', recency: 15, frequency: 6, monetary: 1500, segment: '潜力用户', size: 28 },
  { id: '5', recency: 25, frequency: 4, monetary: 980, segment: '普通用户', size: 55 },
  { id: '6', recency: 30, frequency: 3, monetary: 720, segment: '普通用户', size: 48 },
  { id: '7', recency: 60, frequency: 2, monetary: 450, segment: '沉睡用户', size: 62 },
  { id: '8', recency: 90, frequency: 1, monetary: 280, segment: '沉睡用户', size: 70 },
  { id: '9', recency: 3, frequency: 1, monetary: 186, segment: '新客', size: 35 },
  { id: '10', recency: 7, frequency: 2, monetary: 420, segment: '新客', size: 40 },
  { id: '11', recency: 18, frequency: 7, monetary: 1850, segment: '潜力用户', size: 30 },
  { id: '12', recency: 45, frequency: 2, monetary: 560, segment: '沉睡用户', size: 58 },
]

export const lifecycleFunnel: FunnelStage[] = [
  { stage: '访客', count: 2800000, rate: 100 },
  { stage: '注册', count: 3200000, rate: 42.8 },
  { stage: '首购', count: 890000, rate: 27.8 },
  { stage: '复购', count: 340000, rate: 38.2 },
  { stage: '高忠诚', count: 128000, rate: 37.6 },
]

export const ltvPrediction: LTVPoint[] = [
  { month: 'M1', highValue: 320, normal: 186 },
  { month: 'M2', highValue: 580, normal: 210 },
  { month: 'M3', highValue: 820, normal: 245 },
  { month: 'M4', highValue: 1050, normal: 268 },
  { month: 'M5', highValue: 1280, normal: 290 },
  { month: 'M6', highValue: 1520, normal: 312 },
  { month: 'M7', highValue: 1750, normal: 328 },
  { month: 'M8', highValue: 1980, normal: 345 },
  { month: 'M9', highValue: 2180, normal: 358 },
  { month: 'M10', highValue: 2380, normal: 370 },
  { month: 'M11', highValue: 2550, normal: 382 },
  { month: 'M12', highValue: 2720, normal: 395 },
]

export const userTags: TagItem[] = [
  { name: '18-25岁', weight: 85 },
  { name: '美瞳爱好者', weight: 92 },
  { name: '日抛用户', weight: 78 },
  { name: '学生群体', weight: 65 },
  { name: '白领女性', weight: 72 },
  { name: '近视矫正', weight: 68 },
  { name: '月抛用户', weight: 55 },
  { name: '高复购', weight: 48 },
  { name: '价格敏感', weight: 42 },
  { name: '品牌忠诚', weight: 38 },
  { name: '社交种草', weight: 58 },
  { name: '直播购买', weight: 45 },
]

export const channelROI: ChannelROI[] = [
  { channel: '淘宝旗舰店', spend: 320, revenue: 1280, roi: 4.0 },
  { channel: '京东自营', spend: 280, revenue: 980, roi: 3.5 },
  { channel: '抖音小店', spend: 450, revenue: 1125, roi: 2.5 },
  { channel: '小红书', spend: 180, revenue: 720, roi: 4.0 },
  { channel: '自营APP', spend: 120, revenue: 540, roi: 4.5 },
]

export const conversionFunnels: ConversionFunnel[] = [
  { channel: '淘宝旗舰店', exposure: 5200000, click: 312000, cart: 46800, pay: 18720 },
  { channel: '京东自营', exposure: 3800000, click: 228000, cart: 34200, pay: 15390 },
  { channel: '抖音小店', exposure: 8500000, click: 425000, cart: 51000, pay: 15300 },
  { channel: '小红书', exposure: 2100000, click: 168000, cart: 25200, pay: 10080 },
  { channel: '自营APP', exposure: 1200000, click: 96000, cart: 19200, pay: 9600 },
]

export const heatmapData: HeatmapCell[] = (() => {
  const weeks = ['W1', 'W2', 'W3', 'W4']
  const chs = ['淘宝', '京东', '抖音', '小红书', 'APP']
  const data: HeatmapCell[] = []
  weeks.forEach((week, wi) => {
    chs.forEach((channel, ci) => {
      data.push({
        week,
        channel,
        value: Math.round(60 + Math.sin(wi + ci) * 20 + Math.random() * 15),
      })
    })
  })
  return data
})()

export const mediaInsights: AIInsight[] = [
  {
    title: '抖音投放成本上升',
    content: '抖音近7日CPM上升18%，转化成本较上月增加¥12/单，建议将15%预算向小红书倾斜',
    impact: '预计节省投放成本 ¥8.6万/月',
  },
  {
    title: '小红书种草转化优异',
    content: '小红书美瞳品类ROI达4.2x，高于全渠道均值31%，建议加大KOL种草投入',
    impact: '预计GMV增量 ¥120万/月',
  },
  {
    title: '自营APP高价值用户聚集',
    content: 'APP渠道客单价¥268，较全渠道高44%，会员复购率达52%，建议强化APP专属权益',
    impact: '预计LTV提升 18%',
  },
]

export const userProfiles: UserProfile[] = [
  {
    id: 'u1',
    name: '小美',
    age: 25,
    gender: '女',
    tags: ['美瞳爱好者', '日抛用户', '社交种草', '白领女性'],
  },
  {
    id: 'u2',
    name: '小明',
    age: 22,
    gender: '男',
    tags: ['近视矫正', '月抛用户', '学生群体', '价格敏感'],
  },
  {
    id: 'u3',
    name: '小丽',
    age: 28,
    gender: '女',
    tags: ['高复购', '品牌忠诚', '日抛用户', '美瞳爱好者'],
  },
]

export const recommendations: Record<string, ProductRecommendation[]> = {
  u1: [
    { sku: 'HC-001', name: '海昌星眸日抛 自然棕', brand: '海昌', price: 89, score: 96, reason: '匹配日常通勤场景，与您偏好的自然色系一致' },
    { sku: 'MD-002', name: 'moody小直径日抛 微醺灰', brand: 'moody', price: 78, score: 94, reason: '小红书高热度单品，同画像用户复购率62%' },
    { sku: 'LB-003', name: '拉拜诗小粉片日抛', brand: '拉拜诗', price: 68, score: 91, reason: '轻薄舒适，适合长时间佩戴' },
    { sku: 'KT-004', name: '可糖半年抛 蜜糖棕', brand: '可糖', price: 128, score: 88, reason: '性价比优选，色彩与您历史购买接近' },
    { sku: 'HC-005', name: '海昌俪人美瞳月抛', brand: '海昌', price: 58, score: 85, reason: '补充月抛选择，降低日均佩戴成本' },
  ],
  u2: [
    { sku: 'JJ-101', name: '强生舒日隐形眼镜日抛', brand: '强生安视优', price: 95, score: 95, reason: '近视矫正首选，透氧性优异' },
    { sku: 'BL-102', name: '博士伦清朗日抛', brand: '博士伦', price: 72, score: 92, reason: '学生党高性价比，月均成本低于¥60' },
    { sku: 'AK-103', name: '爱尔康水梯度日抛', brand: '爱尔康', price: 108, score: 89, reason: '长时间学习佩戴舒适度高' },
    { sku: 'BL-104', name: '博士伦纯视月抛', brand: '博士伦', price: 45, score: 86, reason: '月抛方案更经济，适合预算敏感用户' },
    { sku: 'HC-105', name: '海昌倍诺日抛', brand: '海昌', price: 65, score: 83, reason: '入门价位，适合首次尝试隐形眼镜' },
  ],
  u3: [
    { sku: 'JJ-201', name: '强生安视优欧舒适日抛', brand: '强生安视优', price: 128, score: 97, reason: '品牌忠诚用户首选，与您历史购买品牌一致' },
    { sku: 'AK-202', name: '爱尔康日夜型月抛', brand: '爱尔康', price: 88, score: 94, reason: '高复购用户升级选择，佩戴周期更灵活' },
    { sku: 'MD-203', name: 'moody联名限定日抛', brand: 'moody', price: 98, score: 91, reason: '限定款上新，高价值用户专属推荐' },
    { sku: 'HC-204', name: '海昌星眸Pro日抛', brand: '海昌', price: 92, score: 88, reason: 'Pro系列升级，色彩饱和度提升' },
    { sku: 'LB-205', name: '拉拜诗硅水凝胶日抛', brand: '拉拜诗', price: 118, score: 86, reason: '高端材质，适合高频佩戴用户' },
  ],
}

export const marketingContents: MarketingContent[] = [
  {
    channel: '短信',
    title: '复购唤醒',
    content: '【视客眼镜网】小美，您常购的海昌星眸日抛限时8折！自然棕系列上新，顺丰24h发货，30天价保。戳 sigo.cn/s/xxxxx 立即选购',
  },
  {
    channel: 'Push推送',
    title: '个性化推荐',
    content: '为您精选 moody 微醺灰日抛，同年龄段92%用户好评！今日下单赠护理液套装，点击查看 →',
  },
  {
    channel: '微信模板',
    title: '会员专属',
    content: '尊敬的视客会员，根据您的佩戴习惯，AI为您匹配了3款高适配度美瞳。专属优惠券已到账，满199减30，有效期7天。',
  },
]

export const similarityMatrix: SimilarityItem[] = (() => {
  const brandList = ['强生', '博士伦', '海昌', '爱尔康', 'moody', '可糖', '拉拜诗']
  const categories = ['日抛', '月抛', '美瞳', '框架', '护理液']
  const data: SimilarityItem[] = []
  brandList.forEach((brand) => {
    categories.forEach((category) => {
      data.push({
        brand,
        category,
        value: Math.round(20 + Math.random() * 80),
      })
    })
  })
  return data
})()

export const kpiItems: KPIItem[] = [
  { name: '库存周转率', value: 8.2, unit: '次/年', status: 'good', threshold: '目标 ≥6次' },
  { name: '缺货率', value: 3.8, unit: '%', status: 'warning', threshold: '警戒线 3%' },
  { name: '滞销率', value: 5.2, unit: '%', status: 'good', threshold: '目标 ≤8%' },
  { name: '订单履约率', value: 98.6, unit: '%', status: 'good', threshold: '目标 ≥98%' },
  { name: '退货率', value: 4.1, unit: '%', status: 'good', threshold: '目标 ≤5%' },
  { name: '物流时效', value: 1.8, unit: '天', status: 'good', threshold: '目标 ≤2天' },
]

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    level: 'high',
    title: '博士伦月抛库存告急',
    detail: '博士伦清朗月抛库存仅剩4.2天安全库存，近7日销量环比+32%',
    time: '10分钟前',
  },
  {
    id: 'a2',
    level: 'high',
    title: '海昌日抛转化率异常下降',
    detail: '海昌星眸日抛近3日转化率下降22%，疑似竞品促销影响',
    time: '35分钟前',
  },
  {
    id: 'a3',
    level: 'medium',
    title: '抖音渠道ROI低于阈值',
    detail: '抖音小店本周ROI 2.1x，低于目标值3.0x，建议优化投放素材',
    time: '1小时前',
  },
  {
    id: 'a4',
    level: 'medium',
    title: 'moody联名款滞销预警',
    detail: 'moody春季限定款库龄超60天，滞销率达12%，建议启动清仓促销',
    time: '2小时前',
  },
  {
    id: 'a5',
    level: 'low',
    title: '客单价小幅下滑',
    detail: '本周平均客单价¥178，较上周下降4.3%，主要受促销券核销影响',
    time: '3小时前',
  },
]

export const forecastData: ForecastItem[] = [
  { sku: 'JJ-001', name: '强生舒日隐形眼镜日抛30片', currentStock: 12500, forecast30d: 18200, suggest: 6200 },
  { sku: 'BL-002', name: '博士伦清朗日抛30片', currentStock: 3200, forecast30d: 9800, suggest: 6800 },
  { sku: 'HC-003', name: '海昌星眸日抛10片', currentStock: 8900, forecast30d: 15600, suggest: 7200 },
  { sku: 'AK-004', name: '爱尔康水梯度日抛30片', currentStock: 6800, forecast30d: 7200, suggest: 800 },
  { sku: 'MD-005', name: 'moody小直径日抛10片', currentStock: 15200, forecast30d: 12800, suggest: 0 },
  { sku: 'KT-006', name: '可糖半年抛2片', currentStock: 4500, forecast30d: 5200, suggest: 1200 },
  { sku: 'LB-007', name: '拉拜诗小粉片日抛10片', currentStock: 2100, forecast30d: 6800, suggest: 4900 },
]
