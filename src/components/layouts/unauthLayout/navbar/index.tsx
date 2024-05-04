"use client";
import React from "react";
import { Image, Row, Col, Typography } from "antd";
const { Title } = Typography;

const UnauthNavbar: React.FC = () => {
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
      </Row>
    </>
  );
};

export default UnauthNavbar;
