'use client'
import { Feedbacks, Rate } from "@/components";
import { Tabs, Typography } from "antd";
const { Title } = Typography;

const Help:React.FC = () => {
  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)" 

  return (
    <>
      <div 
        style={{ background: borderColor, borderRadius: '20px', height: 'auto', margin: '5rem' }}
        className="outer-gradient-border"
      >
        <div 
          style={{ padding: '2rem', borderRadius: '18px', height: 'auto' }} 
          className='inner-text'
        >     
          <div>
          <Title style={{ textAlign: 'center' }} className="gradient-text">
          Help & Support
          </Title>
            <Tabs
              defaultActiveKey="1"
              tabPosition='left'
              style={{ height: 'auto', paddingBottom: '2rem' }}
              items={[
                {
                  label: 'Feedback',
                  key: '1',
                  children: <Feedbacks/>,
                },
                {
                  label: 'Rating',
                  key: '2',
                  children: <Rate />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Help;