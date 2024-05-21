interface ITargetingCrtieria {
  age: string;
  location: string;
  interests: string;
}

interface IPerformanceMetrics {
  ad_spend: number;
  revenue_generated: number;
  engagement_rate: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface IAd {
  ad_name: string;
  ad_copy: string;
  targeting_criteria: ITargetingCrtieria
  performance_metrics: IPerformanceMetrics
  date: Date;
}