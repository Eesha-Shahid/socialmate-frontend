'use client'
import { InfluencerCampaign } from "components"
import { ICampaignProps } from "./types"

const Campaign:React.FC<ICampaignProps> = () => {
    return (
      <div style={{ margin: '2rem' }}>
        <InfluencerCampaign data={null} dataLoading={false}/>
      </div>
    )
}

export default Campaign;