"use client";
import React from "react";
import { Button, Image, Tabs, Space, Row, Col, Typography, Dropdown, MenuProps } from "antd";
import { Gear, Moon, Person, Question } from "akar-icons";
import TabPane from "antd/es/tabs/TabPane";
import { logout } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/store";
import { navigationIcons, navigationItems } from "@/constants/topNavItems";
import { useRouter } from "next/navigation";
import Link from "next/link";
const { Title } = Typography;

const Navbar: React.FC = () => {
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
    {
      type: 'divider',
    },
    {
      label: <a onClick={handleLogout}>Log Out</a>,
      key: '3',
    },
  ];

  const renderTabs = () => (
    <Tabs centered defaultActiveKey="1">
      {navigationIcons.map((Icon, i) => {
        const id = String(i + 1);
        const item = navigationItems
          ? navigationItems[i]
          : { key: 1, label: 1, children: <div /> };
        return (
          <TabPane
            style={{ color: "red" }}
            animated={true}
            key={id}
            tab={
              <div className="auth-nav-item">
                <Icon style={{ marginRight: "8px" }} />
                {item.label}
              </div>
            }
          >
            {item.children}
          </TabPane>
        );
      })}
    </Tabs>
  )

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
        icon={<Question strokeWidth={1.5} />}
        onClick={()=> router.push('/help')}
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
    <>
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
      <Row>
        <Col span={24}>
          {renderTabs()}
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
