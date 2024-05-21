'use client'
import React, { useState } from 'react';
import { Image, Layout } from 'antd';
import { Navbar } from '@/components';
import Chat from '@/components/chatbot';
const { Header, Footer } = Layout;
  
const AuthLayout: React.FC = () => {

  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem' }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar/>
      </Header>
      <div className="chat-icon" onClick={toggleChat}>
        <Image src='/images/bot.png' height={50} width={50} preview={false}/>
      </div>
      {isChatOpen && <Chat />}
      <Footer style={{ background: 'none' }} />
    </Layout>
  );
};

export default AuthLayout;