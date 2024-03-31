"use client";
import React, { useState } from "react";
import { Button, Image, Tabs, Space, Row, Col, Typography, TabsProps } from "antd";
import { TopNavigationProps } from "./types";
import { Bell, Gear, Moon, Person } from "akar-icons";
import TabPane from "antd/es/tabs/TabPane";
import {
  ContentCalendar,
  Dashboard,
  Integrations,
  SchedulerHub,
  Subscriptions,
} from "@/app";
import { icons, items } from "@/constants/topNavItems";

const { Title } = Typography;
// import Link from "next/link";
// import { Dashboard } from "@/app";
// const { TabPane } = Tabs;

const Navbar: React.FC = () => {

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
          <Button
            style={{ color: "black" }}
            type="text"
            icon={<Person strokeWidth={1.5} />}
          />
        </Space>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Tabs centered defaultActiveKey="1">
          {icons.map((Icon, i) => {
            const id = String(i + 1);
            const item = items ? items[i]: {key: 1, label: 1, children: <Dashboard/>}
            return (
              <TabPane
                style={{ color: 'red' }}
                animated={true}
                key={id}
                tab={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style={{ marginRight: '8px' }} />
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
