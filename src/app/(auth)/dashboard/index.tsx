import React, { useEffect } from "react";
import {
  Avatar,
  Image,
  Card,
  Col,
  List,
  Row,
  Skeleton,
  Space,
  Statistic,
  Typography,
} from "antd";
import { AnalyticsCard, AuthLayout } from "@/components";
import {
  CommentsIcon,
  FacebookIcon,
  FollowersIcon,
  HeartIcon,
  InstagramIcon,
  InstagramMediumIcon,
  ReachIcon,
  RedditIcon,
} from "@/assets/icons";
import GaugeChart from "react-gauge-chart";

import Icon, { HomeFilled, UserOutlined } from "@ant-design/icons";
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
import { Home } from "akar-icons";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
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

  const renderTimePeriodStats = (label: string, value: number | null) => {
    return (
      <Col span={8} style={{ textAlign: "center" }}>
        <div className="gradient-text">{value || "Unknown"}</div>
        <div className="text-bold">{label}</div>
      </Col>
    );
  };

  const renderTopBar = () => {
    return (
      <Row justify="space-between" align="middle">
        <Typography.Title className="gradient-text">
          Hello Vania
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

  const renderAnalytics = () => {
    return (
      <>
        {!analyticsSummary || analyticsSummaryLoading ? (
          // Show skeleton loading when data is loading
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4].map((_, index) => (
              <Col span={5} key={index}>
                <Skeleton active />
              </Col>
            ))}
          </Row>
        ) : (
          // Render analytics data when data is loaded
          <Row gutter={[16, 16]}>
            {[
              {
                title: "Follows and Unfollows",
                data: analyticsSummary.follows_and_unfollows,
                icon: FollowersIcon,
              },
              { title: "Likes", data: analyticsSummary.likes, icon: HeartIcon },
              {
                title: "Comments",
                data: analyticsSummary.comments,
                icon: CommentsIcon,
              },
              { title: "Reach", data: analyticsSummary.reach, icon: ReachIcon },
            ].map((item, index) => (
              <Col span={index == 0 ? 9 : 5} key={index}>
                <AnalyticsCard
                  title={item.title}
                  data={item.data}
                  icon={item.icon}
                />
              </Col>
            ))}
          </Row>
        )}
      </>
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

  const renderAccountDetails = () => {
    return (
      <>
        {accountDetailsSummary && (
          <Col span={24}>
            <Card style={{ height: "100%" }} bordered={false}>
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col span={24}>
                    <Space
                      size={1}
                      direction="vertical"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <div
                          style={{
                            padding: "0.2rem",
                            borderRadius: "50%",
                            overflow: "hidden",
                            background:
                              "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)",
                            border: "0.5px solid transparent",
                          }}
                        >
                          <div
                            style={{ borderRadius: "50%", overflow: "hidden" }}
                          >
                            <Avatar
                              style={{ border: "5px solid white" }}
                              size={150}
                              src={
                                "https://ph-static.z-dn.net/files/df8/95df01df140ac863ca9260409a932cee.jpeg"
                              }
                              icon={<UserOutlined />}
                            />
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                            }}
                          >
                            <Icon component={InstagramMediumIcon} />
                          </div>
                        </div>
                      </div>
                      <Title level={4} style={{ textAlign: "center" }}>
                        {accountDetailsSummary.name}
                      </Title>
                      <Space
                        direction="vertical"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          className="text-mute"
                          style={{ textAlign: "center" }}
                        >
                          @{accountDetailsSummary.username}
                        </Text>
                        <Text style={{ textAlign: "center" }}>
                          {accountDetailsSummary.bio}
                        </Text>
                        <Text
                          className="text-bold"
                          style={{ textAlign: "center" }}
                        >
                          {accountDetailsSummary.website}
                        </Text>
                      </Space>
                    </Space>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  {renderTimePeriodStats(
                    "Posts",
                    accountDetailsSummary.media_count
                  )}
                  {renderTimePeriodStats(
                    "Followers",
                    accountDetailsSummary.followers_count
                  )}
                  {renderTimePeriodStats(
                    "Following",
                    accountDetailsSummary.follows_count
                  )}
                </Row>
              </Space>
            </Card>
          </Col>
        )}
      </>
    );
  };

  const renderProfileViews = () => {
    return (
      <>
        {profileViewsSummary && (
          <Col span={24}>
            <Card title="Profile Views" bordered={false}>
              <Row gutter={[16, 16]}>
                {renderTimePeriodStats("Day", profileViewsSummary.day_views)}
                {renderTimePeriodStats("Week", profileViewsSummary.week_views)}
                {renderTimePeriodStats(
                  "Month",
                  profileViewsSummary.month_views
                )}
              </Row>
            </Card>
          </Col>
        )}
      </>
    );
  };

  const renderAudienceInsights = () => {
    return (
      <>
        {audienceInsightsSummary && (
          <Col span={24}>
            <Card
              title="Audience Insights"
              bordered={false}
              style={{ height: "100%" }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Top Gender Age" bordered={false}>
                    <Row justify="space-around">
                      <Col span={11}>
                        <Statistic
                          title="Male"
                          valueStyle={{ color: getColor("blue") }}
                          value={
                            audienceInsightsSummary.audience_gender_age.male
                          }
                          suffix="y/o"
                        />
                      </Col>
                      <Col span={11}>
                        <Statistic
                          title="Female"
                          valueStyle={{ color: getColor("pink") }}
                          value={
                            audienceInsightsSummary.audience_gender_age.female
                          }
                          suffix="y/o"
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Top Countries" bordered={false}>
                    <List
                      size="small"
                      dataSource={audienceInsightsSummary.audience_country}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </>
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

  const renderMilestones = () => {
    let remaining = null;
    let percentage = 0;
    if (
      analyticsSummary !== null &&
      milestonesSummary !== null &&
      milestonesSummary.reach !== null &&
      milestonesSummary.reach !== undefined &&
      analyticsSummary.reach?.value !== null
    ) {
      remaining = milestonesSummary.reach - analyticsSummary.reach.value;
      percentage = analyticsSummary.reach.value / milestonesSummary.reach;
    }

    return (
      <>
        {milestonesSummary && analyticsSummary && (
          <Col span={24}>
            <Card title="Milestones" bordered={false}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Typography.Text className="text-mute">Reach</Typography.Text>
                  <h1>{milestonesSummary.reach}</h1>
                </Col>
                <Col>
                  <Typography.Text style={{ color: getColor("red") }}>
                    Remaning
                  </Typography.Text>
                  <h1>{remaining ? remaining : "Unknown"}</h1>
                </Col>
              </Row>
              <Row justify="center">
                <GaugeChart
                  style={{ fontWeight: "500", width: "50%" }}
                  nrOfLevels={2}
                  textColor="black"
                  animate={false}
                  arcsLength={[percentage, 1 - percentage]}
                  colors={[getColor("blue"), "#E5E5EF"]}
                  percent={percentage}
                  arcPadding={0.02}
                />
              </Row>
            </Card>
          </Col>
        )}
      </>
    );
  };

  const renderGoals = () => {
    let remaining = null;
    let percentage = 0;
    if (
      analyticsSummary !== null &&
      goalsSummary !== null &&
      goalsSummary !== undefined &&
      goalsSummary.reach !== null &&
      goalsSummary.reach !== undefined &&
      analyticsSummary.reach?.value !== null
    ) {
      remaining = goalsSummary.reach - analyticsSummary.reach.value;
      percentage = analyticsSummary.reach.value / goalsSummary.reach;
      console.log(remaining);
      console.log(percentage);
    }

    return (
      <>
        {goalsSummary && analyticsSummary && (
          <Col span={24}>
            <Card title="Goals" bordered={false}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Typography.Text className="text-mute">Reach</Typography.Text>
                  <h1>{goalsSummary.reach}</h1>
                </Col>
                <Col>
                  <Typography.Text style={{ color: getColor("red") }}>
                    Remaning
                  </Typography.Text>
                  <h1>{remaining ? remaining : "Unknown"}</h1>
                </Col>
              </Row>
              <Row justify="center">
                <GaugeChart
                  nrOfLevels={32}
                  textColor="black"
                  animate={false}
                  arcsLength={[percentage, 1 - percentage]}
                  colors={[getColor("blue"), "#E5E5EF"]}
                  percent={percentage}
                  arcPadding={0.02}
                  style={{ width: "50%" }}
                />
              </Row>
            </Card>
          </Col>
        )}
      </>
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
            {analyticsSummary !== null && renderAnalytics()}
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
            {renderAccountDetails()}
          </Row>
        </Col>
        <Col span={9}>
          <Row
            gutter={[16, 16]}
            style={{ display: "flex", alignItems: "center" }}
          >
            {renderProfileViews()}
            {renderCampaigns()}
            {renderAudienceInsights()}
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={[16, 16]}>
            {renderMilestones()}
            {renderGoals()};
          </Row>
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;
