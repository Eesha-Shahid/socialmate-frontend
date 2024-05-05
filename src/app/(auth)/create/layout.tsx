'use client'
import React from 'react';
import { Col, Layout, Row, Image, Typography, Space, Button, Dropdown, MenuProps } from 'antd';
import { Bell, Gear, Moon, Person } from 'akar-icons';
import { logout } from '@/redux/actions/authAction';
import { useAppDispatch } from '@/redux/hooks';
const { Footer, Header } = Layout;

const { Title } = Typography;
  
const CreateLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">View Profile</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">Option 2</a>,
      key: '1',
    },
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
            <Title level={4}>Social Mate</Title>
          </Row>
          </Col>
          <Col style={{ display: "flex", justifyContent: "end" }} md={4}>
          {renderIcons()}
          </Col>
        </Row>
        {children}
      </Header>
      <Footer style={{ background: 'none' }} />
    </Layout>
  );
};

export default CreateLayout;