'use client'
import React from "react";
import { AuthLayout } from "@/components";
import { Card, Col, Row, Typography } from "antd";

const Integrations = () => {
  return (
    <AuthLayout>
      <Row gutter={[16, 16]} style={{ margin: '2rem' }}>
        <Col span={24}>
          <Typography.Title>
            Your Social Integrations
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {[...Array(3)].map((_, index) => (
              <Col span={12} key={index}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default Integrations;
