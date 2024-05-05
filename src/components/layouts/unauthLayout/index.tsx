'use client'
import React from 'react';
import { Layout } from 'antd';
import { Footer, UnauthForm, UnauthNavbar } from 'components';
import { Content } from 'antd/es/layout/layout';
const { Header } = Layout;
  
const UnauthLayout: React.FC<UnauthLayoutProps> = ({ children }) => {

  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem', minHeight: "97vh" }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <UnauthNavbar/>
      </Header>
      <Content>
        <UnauthForm/>
      </Content>
      <Footer />
    </Layout>
  );
};

export default UnauthLayout;