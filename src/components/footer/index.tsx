import React from 'react';
import { Layout } from 'antd';
import { HeartIcon } from '@/assets/icons';
import Icon from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ marginRight: '0.3rem' }}>SocialMate ©{new Date().getFullYear()} Created with </span>
        <Icon component={HeartIcon} style={{ marginLeft: '4px', marginRight: '4px' }} />
      </div>
    </AntFooter>
  );
};

export default Footer;