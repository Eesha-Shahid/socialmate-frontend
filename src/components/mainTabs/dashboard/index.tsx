import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  Col,
  Row,
  Space,
  Typography,
} from "antd";
import { FacebookIcon, InstagramIcon, RedditIcon } from "@/assets/icons";
import GaugeChart from "react-gauge-chart";
import Icon, { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { InstagramSummarySelector } from "@/redux/reducers";
import {
  getAccountDetailsSummary,
  getAnalyticsSummary,
  getAudienceInsightsSummary,
  getGoalsSummary,
  getMilestonesSummary,
  getProfileViewsSummary,
} from "@/redux/actions/instagramSummaryAction";
import { useAppDispatch } from "@/redux/hooks";
import { getColor } from "@/colors";
import AnalyticsSummary from "./analyticsSummary";
import ProfileViewsSummary from "./profileViewsSummary";
import AccountDetailsSummary from "./accountDetailsSummary";
import AudienceInsightsSummary from "./audienceInsightsSummary";
import MilestonesSummary from "./milestonesSummary";
import GoalsSummary from "./goalsSummary";
import { AuthSelector } from "@/redux/reducers/authReducer";
const Dashboard: React.FC = () => {
  const { user } = useSelector(AuthSelector);
  const dispatch = useAppDispatch();

  const {
    analyticsSummary,
    analyticsSummaryLoading,
    profileViewsSummary,
    profileViewsSummaryLoading,
    accountDetailsSummary,
    accountDetailsSummaryLoading,
    audienceInsightsSummary,
    audienceInsightsSummaryLoading,
    milestonesSummary,
    milestonesSummaryLoading,
    goalsSummary,
    goalsSummaryLoading,
  } = useSelector(InstagramSummarySelector);

  useEffect(() => {
    dispatch(getAnalyticsSummary());
    dispatch(getProfileViewsSummary());
    dispatch(getAccountDetailsSummary());
    dispatch(getAudienceInsightsSummary());
    dispatch(getMilestonesSummary());
    dispatch(getGoalsSummary());
  }, []);

  const renderTopBar = () => {
    return (
      <Row justify="space-between" align="middle">
        <Typography.Title className="gradient-text">
          Hello {user?.username}
        </Typography.Title>
        <Col>
          <Space size={8}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  padding: "0.1rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background:
                    "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)",
                  border: "0.5px solid transparent",
                }}
              >
                <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                  <Avatar
                    style={{ border: "5px solid white" }}
                    size={80}
                    src={
                      "https://ph-static.z-dn.net/files/df8/95df01df140ac863ca9260409a932cee.jpeg"
                    }
                    icon={<UserOutlined />}
                  />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <Icon component={InstagramIcon} />
              </div>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  padding: "0.1rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background:
                    "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)",
                  border: "0.5px solid transparent",
                }}
              >
                <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                  <Avatar
                    style={{ border: "5px solid white" }}
                    size={80}
                    src={
                      "https://ph-static.z-dn.net/files/df8/95df01df140ac863ca9260409a932cee.jpeg"
                    }
                    icon={<UserOutlined />}
                  />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <Icon component={FacebookIcon} />
              </div>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  padding: "0.1rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background:
                    "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)",
                  border: "0.5px solid transparent",
                }}
              >
                <div style={{ borderRadius: "50%", overflow: "hidden" }}>
                  <Avatar
                    style={{ border: "5px solid white" }}
                    size={80}
                    src={
                      "https://ph-static.z-dn.net/files/df8/95df01df140ac863ca9260409a932cee.jpeg"
                    }
                    icon={<UserOutlined />}
                  />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <Icon component={RedditIcon} />
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    );
  };

  const renderUpcomingPosts = () => {
    return (
      <Col span={6}>
        <Card
          title="Scheduled Posts"
          bordered={false}
          style={{ height: "100%" }}
        >
          Scheduled Posts
        </Card>
      </Col>
    );
  };

  const renderCampaigns = () => {
    return (
      <Col span={24}>
        <Card title="Campaigns" bordered={false}>
          Card content
        </Card>
      </Col>
    );
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "97%", margin: "2rem", marginTop: "3rem" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {renderTopBar()}
            {analyticsSummary !== null && (
              <AnalyticsSummary
                data={analyticsSummary}
                dataLoading={analyticsSummaryLoading}
              />
            )}
          </Space>
        </Col>
        {renderUpcomingPosts()}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={9}>
          <Row
            gutter={[16, 16]}
            style={{ display: "flex", alignItems: "center" }}
          >
            {accountDetailsSummary !== null && (
              <AccountDetailsSummary
                data={accountDetailsSummary}
                dataLoading={accountDetailsSummaryLoading}
              />
            )}
          </Row>
        </Col>
        <Col span={9}>
          <Row
            gutter={[16, 16]}
            style={{ display: "flex", alignItems: "center" }}
          >
            {profileViewsSummary !== null && (
              <ProfileViewsSummary
                data={profileViewsSummary}
                dataLoading={profileViewsSummaryLoading}
              />
            )}
            {renderCampaigns()}
            {audienceInsightsSummary !== null && (
              <AudienceInsightsSummary
                data={audienceInsightsSummary}
                dataLoading={audienceInsightsSummaryLoading}
              />
            )}
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={[16, 16]}>
            {milestonesSummary !== null && analyticsSummary !== null && (
              <MilestonesSummary
                analyticsData={analyticsSummary}
                milestonesData={milestonesSummary}
                analyticsDataLoading={analyticsSummaryLoading}
                milestonesDataLoading={milestonesSummaryLoading}
              />
            )}
            {goalsSummary !== null && analyticsSummary !== null && (
              <GoalsSummary
                analyticsData={analyticsSummary}
                goalsData={goalsSummary}
                analyticsDataLoading={analyticsSummaryLoading}
                goalsDataLoading={goalsSummaryLoading}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;
