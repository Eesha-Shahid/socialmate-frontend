// import { TextWithGradientBorder } from "components"
// import { Row, Col, Typography, Carousel, Space } from "antd"
// import { useSelector } from "react-redux";
// import { SubscriptionSelector } from "@/redux/reducers";
// import ReactCreditCards from "react-credit-cards-2";
// import { useEffect, useState } from "react";
// import { getPaymentMethods } from "@/redux/actions/subscriptionAction";
// import { useAppDispatch } from "@/redux/store";

// const {Text, Title} = Typography;

// const StepTwo = () => {
//   const dispatch = useAppDispatch();
//   const { paymentMethods } = useSelector(SubscriptionSelector);
//   const [selectedCardIndex, setSelectedCardIndex] = useState(0);

//   useEffect(() => {
//     dispatch(getPaymentMethods());
//   }, []);
  
//   return (
//     <>
//       <Row justify="center" gutter={16} style={{ marginBottom: '3rem' }}>
//         <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
//           <Text style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '400' }}>
//             Fine-Tune your Strategy
//           </Text>
//         </Col>
//         <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
//           <Text style={{ textAlign: 'center', fontSize: '1rem'}}>
//           Where to Target and What to Invest?
//           </Text>
//         </Col>
//       </Row>
//       <Row justify="center" gutter={16}>
//         <Col span={12}>
//         <Space size='middle' direction='vertical' style={{ width: '100%' }}>
//           {/* <Row justify="center" gutter={16}> */}
//             <Col span={24}>
//               <Text strong>Location</Text>
//             </Col>
//             <Col span={24}>
//               <TextWithGradientBorder 
//                   placeholder="E.g. 1234 1234 1234 1234"
//                 />
//             </Col>
//             <Col span={24}>
//               <Text strong>Daily Budget</Text>
//             </Col>
//             <Col span={24}>
//               <TextWithGradientBorder 
//                 placeholder="Enter full name"
//               />  
//             </Col>
//           </Space>
//         </Col>
//         <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Carousel style={{ width: 400 }} arrows infinite={false} beforeChange={(prev, next) => setSelectedCardIndex(next)}>
//             {paymentMethods?.map((card, index) => (
//               <div key={index}>
//                 <ReactCreditCards
//                   name={card.holder_name}
//                   number={card.card_number}
//                   expiry={`${card.exp_month}/${card.exp_year}`}
//                   cvc={card.cvc}
//                 />
//               </div>
//             ))}
//           </Carousel>
//         </Col>
//       </Row>
//     </>
//   )
// }

// export default StepTwo

import { getColor } from '@/colors';
import { Col, Row, Typography, Image, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'

const { Text, Title } = Typography;

interface PreviewProps {
  caption?: string;
  description?: string;
  file: File | null;
  hashtag?: string;
  flair?: string;
  subreddit?: string;
}

const StepTwo:React.FC<PreviewProps> = ({ caption,  description, file, hashtag, flair, subreddit }) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <Row justify={'center'}>
      <Col style={{ marginRight: '5rem' }}>
      <Title style={{ textAlign: 'center' }} className="gradient-text">
        Instagram Preview
      </Title>
      <DeviceFrameset device="iPhone X" color="black">
        <Row gutter={[ 16, 16 ]} style={{ margin: '5rem 1.5rem' }}>
          {fileURL && (
            <Col span={24}>
              <Image alt='Image' src={fileURL} /> 
            </Col>
          )}
          <Col span={24}>
            <Text>{caption} <span style={{ color: 'blue' }}>#{hashtag}</span></Text> 
          </Col>
        </Row>
      </DeviceFrameset>
      </Col>
      <Col>
      <Title style={{ textAlign: 'center' }} className="gradient-text">
        Reddit Preview
      </Title>
      <DeviceFrameset device="iPhone X" color="black">
        <Row gutter={[ 16, 16 ]} style={{ margin: '5rem 1.5rem' }}>
          <Col span={24}>
            <Tag>r/{subreddit}</Tag>
          </Col>
          <Col span={24}>
            <Text>{description}</Text>
          </Col>
          <Col span={24}>
            <Tag style={{ background: getColor('red'), color: 'white', borderRadius: '15px' }}>{flair}</Tag>
          </Col>
        </Row>
      </DeviceFrameset>
      </Col>
    </Row>
  )
}

export default StepTwo;