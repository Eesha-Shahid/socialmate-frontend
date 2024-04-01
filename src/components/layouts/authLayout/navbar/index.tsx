"use client";
import React from "react";
import { Button, Image, Tabs, Space, Row, Col, Typography, Dropdown, MenuProps } from "antd";
import { Bell, Gear, Moon, Person } from "akar-icons";
import TabPane from "antd/es/tabs/TabPane";
import { navigationIcons, navigationItems, profileDropdownItems } from "@/constants";
import { logout } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/store";
const { Title } = Typography;

const Navbar: React.FC = () => {
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
            <Title level={4}>Social Mate</Title>
          </Row>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }} md={4}>
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
