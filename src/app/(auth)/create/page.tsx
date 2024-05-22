'use client'
import { StepOne, StepThree, StepTwo } from 'components';
import { Button, Row, Steps, Typography  } from 'antd';
import React, { useState } from 'react';
import { ICreateAdProps } from './types';
import Icon from '@ant-design/icons';
import { CreativeIcon, DisabledNextIcon, NextIcon, PaymentIcon, TargetingIcon } from '@/assets/icons';
import { useRouter } from 'next/navigation';

const { Title } = Typography

const CreateAd: React.FC<ICreateAdProps> = ({ type2 }) => {
  const [current, setCurrent] = useState(0);
  const [ captionPreview, setCaptionPreview ] = useState('');
  const [ descriptionPreview, setDescriptionPreview ] = useState('');
  const [ hashtagPreview, setHashtagPreview ] = useState('');
  const [ flairPreview, setFlairPreview ] = useState('');
  const [ subredditPreview, setSubredditPreview ] = useState('');
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const type = type2 ? type2 : 'post'

  const steps = [
    {
      title: 'Creative',
      content: <StepOne 
        setCaptionPreview={setCaptionPreview} 
        setDescriptionPreview={setDescriptionPreview} 
        setFilePreview={setFilePreview} 
        setHashtagPreview={setHashtagPreview}
        setFlairPreview={setFlairPreview}
        setSubredditPreview={setSubredditPreview}
      />,
      icon: current === 0 
        ? <Icon component={CreativeIcon} /> 
        : <Icon component={CreativeIcon} style={{ filter: 'grayscale(100%)' }} />,
    },
    {
      title: 'Preview',
      content: <StepTwo 
        caption={captionPreview}  
        description={descriptionPreview}  
        file={filePreview} 
        hashtag={hashtagPreview}
        flair={flairPreview}
        subreddit={subredditPreview}
      />,
      icon: current === 1 
        ? <Icon component={TargetingIcon} /> 
        : <Icon component={TargetingIcon} style={{ filter: 'grayscale(100%)' }} />,
    },
    {
      title: 'Payment',
      content: <StepThree/>,
      icon: current === 2 
        ? <Icon component={PaymentIcon} /> 
        : <Icon component={PaymentIcon} style={{ filter: 'grayscale(100%)' }} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title, icon: item.icon }));
  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)" 

  return (
    <>
    <Title style={{ textAlign: 'center' }} className="gradient-text">
        Let&apos;s create some magic!
    </Title>
    <Steps
      size='small'
      style={{ marginTop: '5rem' }}
      labelPlacement="vertical"
      current={current}
      responsive={true}
      items={items}
    />
    <div 
      style={{ background: borderColor, borderRadius: '20px', height: 'auto', margin: '5rem' }}
      className="outer-gradient-border"
    >
      <div 
        style={{ padding: '2rem', borderRadius: '18px', height: 'auto' }} 
        className='inner-text'
      >     
        <div>{steps[current].content}</div>
        <Row justify='space-between' style={{ margin: '1rem' }}>
          {current > 0 && (
            <Icon component={NextIcon} onClick={() => prev()} style={{ transform: 'rotate(180deg)' }} />
          )}
          {current == 0 && (
            <Icon component={DisabledNextIcon} style={{ transform: 'rotate(180deg)' }} />
          )}
          {current < steps.length - 1 &&
            <Icon component={NextIcon} onClick={() => next()} />
          }
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => router.push('/auth')}>
              Done
            </Button>
          )}    
        </Row>
      </div>
    </div>
    </>
  );
};

export default CreateAd;
