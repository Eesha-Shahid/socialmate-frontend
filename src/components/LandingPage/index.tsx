"use client"
import React from 'react';
import { Divider, Layout } from 'antd';
import Footer from '../footer';
import { Content, Header } from 'antd/es/layout/layout';
import LandingNavbar from './navbar';
import HeroSection from './HeroSection';
import Solutions from './Solutions';
import Platforms from './Platforms';
import Pricing from './Pricing';

const LandingPage: React.FC = () => {

    return (
        <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem', minHeight: "97vh" }}>
            <Header style={{  background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
                <LandingNavbar />
            </Header>
            <Divider />
            <Content>
                <HeroSection />
                <Solutions />
                <Platforms />
                <Pricing />
            </Content>
            <Footer />
        </Layout>
    );
};

export default LandingPage;
