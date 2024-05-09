'use client'
import { InfluencerCampaign } from "components"
import { ICampaignProps } from "./types"

const Campaign:React.FC<ICampaignProps> = () => {
    return (
      <InfluencerCampaign data={null} dataLoading={false}/>
    )
}

export default Campaign;