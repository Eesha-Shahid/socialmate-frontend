"use client";
import React, { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import { IntegrationCard } from "components";
import { getIntegrations } from "@/redux/actions/integrationsAction";
import { IntegrationsSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { Platform } from "@/types";
import { FacebookLogo, InstagramLogo, RedditLogo } from "@/assets/icons";

const Integrations = () => {

  const dispatch = useAppDispatch();
  const { integrations } = useSelector(IntegrationsSelector);

  const platformTypes = [Platform.Facebook, Platform.Instagram, Platform.Reddit];

  useEffect(() => {
    dispatch(getIntegrations());
  }, [integrations]);

  const handleToggle = (platform: Platform) => {
    console.log(platform)
  };

  const handleDelete = (platform: Platform) => {
    console.log(platform)
  };

  return (
    <Row gutter={[16, 16]} style={{ margin: "2rem" }}>
      <Col span={24}>
        <Typography.Title className="gradient-text">Your Social Integrations</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {platformTypes.map((platform, index) => {
            const integrationData = integrations?.find(integration => integration.platform === platform);
            return (
              <Col span={12} key={index}>
                <IntegrationCard
                  platform={platform}
                  icon={
                    platform === Platform.Facebook ? FacebookLogo :
                    platform === Platform.Instagram ? InstagramLogo :
                    platform === Platform.Reddit ? RedditLogo :
                    undefined
                  }
                  data={integrationData || null}
                  onToggle={() => handleToggle(platform)}
                  onDelete={() => handleDelete(platform)}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default Integrations;

