import { InfluencerAnalysis, InfluencerDiscovery } from "@/components";
import { TabsProps } from "antd";

export const influencerNavItems: TabsProps['items'] = [
  {
    key: '1',
    label: 'Influencer Discovery',
    children: <InfluencerDiscovery/>,
  },
  {
    key: '2',
    label: 'Competitor Analysis',
    children: <InfluencerAnalysis/>,
  },
];