// src/components/layouts/unauthLayout/index.tsx
'use client'
import React from 'react';
import { Layout } from 'antd';
import { Footer, UnauthNavbar } from '@/components'; // Adjust import paths as necessary
import { Content } from 'antd/es/layout/layout';
const { Header } = Layout;

interface UnauthLayoutProps {
  children: React.ReactNode;
}

const UnauthLayout: React.FC<UnauthLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem', minHeight: "97vh" }}>
      <div className="unauth-gradient-purple"></div>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <UnauthNavbar />
      </Header>
      <Content>
        {children}
      </Content>
      <Footer />
      <div className="unauth-gradient-blue"></div>
    </Layout>
  );
};

export default UnauthLayout;
