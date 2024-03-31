'use client'
import React from 'react';
import { Layout } from 'antd';
import { Navbar } from '@/components';
const { Header, Footer } = Layout;
  
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem' }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar/>
      </Header>
      {children}
      <Footer style={{ background: 'none' }} />
    </Layout>
  );
};

export default AuthLayout;