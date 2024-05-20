'use client'
import React from 'react';
import { Col, Layout, Row, Image, Typography, Space, Button, Dropdown, MenuProps } from 'antd';
import { Bell, Gear, Moon, Person } from 'akar-icons';
import { logout } from '@/redux/actions/authAction';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const { Footer, Header } = Layout;

const { Title } = Typography;
  
const AuthLayoutTwo: React.FC<AuthLayoutTwoProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    router.push('/')
  };
  
  const items: MenuProps['items'] = [
    {
      label: <Link href="/profile">View Profile</Link>,
      key: '0',
    },
    // {
    //   label: <a href="https://www.aliyun.com">Option 2</a>,
    //   key: '1',
    // },
    {
      type: 'divider',
    },
    {
      label: <a onClick={handleLogout}>Log Out</a>,
      key: '3',
    },
  ];

  const renderIcons = () => (
    <Space size="middle">
      <Button
        style={{ color: "black" }}
        type="text"
        icon={<Moon strokeWidth={1.5} />}
      />
      <Button
        style={{ color: "black" }}
        type="text"
        icon={<Gear strokeWidth={1.5} />}
      />
      <Button
        style={{ color: "black" }}
        type="text"
        icon={<Bell strokeWidth={1.5} />}
      />
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button
          style={{ color: "black" }}
          type="text"
          icon={<Person strokeWidth={1.5} />}
        />
      </Dropdown>
    </Space>
  )
  
  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem' }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <Row style={{ width: "100%" }} justify="space-between" align="middle">
          <Col span={5}>
          <Row align="middle">
            <Image
            src="/images/logo.png"
            alt="Logo"
            preview={false}
            style={{ height: "55px", width: "55px", marginRight: "1rem" }}
            />
            <Title style={{ cursor: 'pointer' }} onClick={()=> router.push('/')} level={4}>Social Mate</Title>
          </Row>
          </Col>
          <Col style={{ display: "flex", justifyContent: "end" }} md={4}>
          {renderIcons()}
          </Col>
        </Row>
      </Header>
        {children}
      <Footer style={{ background: 'none' }} />
    </Layout>
  );
};

export default AuthLayoutTwo;