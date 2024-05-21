'use client'
import { influencerNavItems } from "@/constants";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const InfluencerCampaign:React.FC = () => {

  const renderTabs = () => (
    <Tabs centered>
      {influencerNavItems?.map(item => (
        <TabPane tab={item.label} key={item.key}>
          {item.children}
        </TabPane>
      ))}
    </Tabs>
  )

  return (
    <div style={{ margin: '2rem', textAlign: 'center' }}>
      {renderTabs()}
    </div>
  )
}

export default InfluencerCampaign;