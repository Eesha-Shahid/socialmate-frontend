"use client";
import React, { useState } from "react";
import { Button, Image, Tabs, Space, Row, Col, Typography } from "antd";
import { TopNavigationProps } from "./types";
import { Bell, Gear, Moon, Person } from "akar-icons";

const { Title } = Typography;
// import Link from "next/link";
// import { Dashboard } from "@/app";
// const { TabPane } = Tabs;

const Navbar: React.FC<TopNavigationProps> = ({ items }) => {
  const [activeKey, setActiveKey] = useState("1");

  const handleTabClick = (key: string) => {
    setActiveKey(key);
  };

  return (
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
      <Col span={15}>
        {/* <Tabs activeKey={activeKey} style={{ color: "black" }} centered>
          {items.map((item) => (
            <TabPane
              tab={
                <Link
                  style={{ color: "black" }}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(item.key);
                  }}
                >
                  <Space align="center">
                    {React.createElement(item.icon, {
                      style: { marginRight: "8px" },
                    })}
                    {item.label}
                  </Space>
                </Link>
              }
              key={item.key}
            />
          ))}
        </Tabs> */}
        {/* <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `<${id}`,
            };
          })}
        /> */}
         <Tabs
          defaultActiveKey="1"
          centered
          items={items.map((item) => {
            return {
              label: item.label,
              key: item.key,
              icon: <item.icon/>,
              // children: <item.route/>,
            };
          })}
        />
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
          <Button
            style={{ color: "black" }}
            type="text"
            icon={<Person strokeWidth={1.5} />}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default Navbar;
