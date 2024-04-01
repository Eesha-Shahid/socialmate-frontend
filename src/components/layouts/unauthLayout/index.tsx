'use client'
import React from 'react';
import { Layout, Spin } from 'antd';
import { Dashboard, Footer } from '@/components';
import UnuthNavbar from './navbar';
import { Content } from 'antd/es/layout/layout';
import Login from './login';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/redux/reducers/authReducer';
const { Header } = Layout;
  
const UnauthLayout: React.FC<UnauthLayoutProps> = ({ children }) => {

  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem', minHeight: "97vh" }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <UnuthNavbar/>
      </Header>
      <Content>
        <Login/>
      </Content>
      <Footer />
    </Layout>
  );
};

export default UnauthLayout;