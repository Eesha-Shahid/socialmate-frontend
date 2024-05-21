'use client'
import { Ads } from "components"

const Advertisement:React.FC = () => {
    return (
      <div style={{ margin: '2rem' }}>
        <Ads data={null} dataLoading={false}/>
      </div>
    )
}

export default Advertisement;