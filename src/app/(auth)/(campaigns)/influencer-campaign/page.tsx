'use client'
import { Influencers } from "@/components";

const InfluencerCampaign:React.FC = () => {
    return (
      <div style={{ margin: '2rem' }}>
        <Influencers data={null} dataLoading={false}/>
      </div>
    )
}

export default InfluencerCampaign;