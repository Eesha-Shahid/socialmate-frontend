'use client'
import { StepOne } from 'components';
import { Button, Steps, Typography, message  } from 'antd';
import React, { useState } from 'react';
import { ICreateAdProps } from './types';
import Icon, { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { CreativeIcon, PaymentIcon, TargetingIcon } from '@/assets/icons';

const { Title } = Typography

const CreateAd: React.FC<ICreateAdProps> = ({ type2 }) => {
  const [current, setCurrent] = useState(0);

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
      content: <StepOne />,
      icon: current === 0 
        ? <Icon component={CreativeIcon} /> 
        : <Icon component={CreativeIcon} style={{ filter: 'grayscale(100%)' }} />,
    },
    {
      title: 'Targeting & Delivery',
      content: <StepOne />,
      icon: current === 1 
        ? <Icon component={TargetingIcon} /> 
        : <Icon component={TargetingIcon} style={{ filter: 'grayscale(100%)' }} />,
    },
    {
      title: 'Payment',
      content: <StepOne />,
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
      style={{ marginTop: '3rem' }}
      labelPlacement="vertical"
      current={current}
      responsive={true}
      items={items}
    />
    <div 
      style={{ background: borderColor, borderRadius: '20px', height: 'auto', margin: '3rem' }}
      className="outer-gradient-border"
    >
      <div 
        style={{ padding: '10px 18px', borderRadius: '18px', height: 'auto' }} 
        className='inner-text'
      >
        {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
        <div>{steps[current].content}</div>    
      </div>
    </div>
      
    </>
  );
};

export default CreateAd;
