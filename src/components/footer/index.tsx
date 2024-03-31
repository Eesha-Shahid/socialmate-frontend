import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      SocialMate ©{new Date().getFullYear()} Created with Love
    </AntFooter>
  );
};

export default Footer;