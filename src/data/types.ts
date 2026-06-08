export type TimeRange = '7d' | '30d' | '90d'

export interface MetricCard {
  label: string
  value: string
  change: number
  unit?: string
}

export interface Brand {
  id: string
  name: string
  category: '隐形眼镜' | '美瞳' | '框架眼镜' | '太阳镜'
}

export interface Channel {
  id: string
  name: string
}

export interface RFMUser {
  id: string
  recency: number
  frequency: number
  monetary: number
  segment: string
  size: number
}

export interface FunnelStage {
  stage: string
  count: number
  rate: number
}

export interface LTVPoint {
  month: string
  highValue: number
  normal: number
}

export interface TagItem {
  name: string
  weight: number
}

export interface ChannelROI {
  channel: string
  spend: number
  revenue: number
  roi: number
}

export interface ConversionFunnel {
  channel: string
  exposure: number
  click: number
  cart: number
  pay: number
}

export interface HeatmapCell {
  week: string
  channel: string
  value: number
}

export interface AIInsight {
  title: string
  content: string
  impact: string
}

export interface UserProfile {
  id: string
  name: string
  age: number
  gender: string
  tags: string[]
}

export interface ProductRecommendation {
  sku: string
  name: string
  brand: string
  price: number
  score: number
  reason: string
}

export interface MarketingContent {
  channel: string
  title: string
  content: string
}

export interface SimilarityItem {
  brand: string
  category: string
  value: number
}

export interface KPIItem {
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'danger'
  threshold: string
}

export interface AlertItem {
  id: string
  level: 'high' | 'medium' | 'low'
  title: string
  detail: string
  time: string
}

export interface ForecastItem {
  sku: string
  name: string
  currentStock: number
  forecast30d: number
  suggest: number
}

export interface GMVTrend {
  date: string
  [brand: string]: string | number
}

export interface DataSource {
  name: string
  value: number
}

export interface ValueProposition {
  title: string
  target: string
  icon: string
}
