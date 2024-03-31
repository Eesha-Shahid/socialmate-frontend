import React, { useEffect } from "react";
import { Avatar, Card, Col, List, Row, Skeleton, Space, Statistic, Typography } from "antd";
import { AnalyticsCard, AuthLayout } from "@/components";
import {
  CommentsIcon,
  FollowersIcon,
  HeartIcon,
  ReachIcon,
} from "@/assets/icons";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { InstagramSummarySelector } from "@/redux/reducers";
import { getAccountDetailsSummary, getAnalyticsSummary, getAudienceInsightsSummary, getProfileViewsSummary } from "@/redux/actions/instagramSummaryAction";
import { useAppDispatch } from "@/redux/hooks";
import { getColor } from "@/colors";

const { Title, Text } = Typography;

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { 
    analyticsSummary, 
    analyticsSummaryLoading, 
    profileViewsSummary, 
    profileViewsSummaryLoading, 
    accountDetailsSummary, 
    accountDetailsSummaryLoading, 
    audienceInsightsSummary, 
    audienceInsightsSummaryLoading 
  } = useSelector(InstagramSummarySelector);

  useEffect(() => {
    dispatch(getAnalyticsSummary());
    dispatch(getProfileViewsSummary());
    dispatch(getAccountDetailsSummary());
    dispatch(getAudienceInsightsSummary());
  }, []);

  const renderTimePeriodStats = (label: string, value: number | null) => {
    return (
      <Col span={8} style={{ textAlign: "center" }}>
        <div>{value || 'Unknown'}</div>
        <div>{label}</div>
      </Col>
    );
  };

  const renderTopBar = () => {
    return (
      <Row justify="space-between" align="middle">
        <Typography.Title>Hello Vania</Typography.Title>
        <Col>
          <Space size={8}>
            <Avatar />
            <Avatar />
            <Avatar />
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
              { title: "Follows and Unfollows", data: analyticsSummary.follows_and_unfollows, icon: FollowersIcon },
              { title: "Likes", data: analyticsSummary.likes, icon: HeartIcon },
              { title: "Comments", data: analyticsSummary.comments, icon: CommentsIcon },
              { title: "Reach", data: analyticsSummary.reach, icon: ReachIcon }
            ].map((item, index) => (
              <Col span={index == 0 ? 9: 5} key={index}>
                <AnalyticsCard title={item.title} data={item.data} icon={item.icon} />
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
          <Col span={9}>
            <Card style={{ height: "100%" }} bordered={false}>
              <Space size='middle' direction="vertical" style={{ width: '100%' }}>
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
                      <Avatar
                        size={150}
                        src={accountDetailsSummary.profile_picture_url}
                        icon={<UserOutlined />}
                      />
                      <Title level={4} style={{ textAlign: "center" }}>
                        {accountDetailsSummary.name}
                      </Title>
                      <Text style={{ textAlign: "center" }}>
                        @{accountDetailsSummary.username}
                      </Text>
                      <Text style={{ textAlign: "center" }}>
                        {accountDetailsSummary.bio}
                      </Text>
                      <Text style={{ textAlign: "center" }}>
                        {accountDetailsSummary.website}
                      </Text>
                    </Space>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  {renderTimePeriodStats("Posts", accountDetailsSummary.media_count)}
                  {renderTimePeriodStats("Followers", accountDetailsSummary.followers_count)}
                  {renderTimePeriodStats("Following", accountDetailsSummary.follows_count)}
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
                {renderTimePeriodStats("Month", profileViewsSummary.month_views)}
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
            <Card title="Audience Insights" bordered={false} style={{ height: '100%' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title="Top Gender Age" bordered={false}>
                    <Row justify="space-around">
                      <Col span={11}>
                        <Statistic title="Male" valueStyle={{color: getColor('blue')}} value={audienceInsightsSummary.audience_gender_age.male} suffix="y/o" />
                      </Col>
                      <Col span={11}>
                        <Statistic title="Female" valueStyle={{color: getColor('pink')}} value={audienceInsightsSummary.audience_gender_age.female} suffix="y/o" />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Top Countries" bordered={false}>
                    <List
                      size="small"
                      dataSource={audienceInsightsSummary.audience_country}
                      renderItem={(item) => (
                        <List.Item>
                          {item}
                        </List.Item>
                      )}
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
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    );
  };

  const renderMilestones = () => {
    return (
      <Col span={24}>
        <Card title="Milestones" bordered={false}>
          Card content
        </Card>
      </Col>
    );
  };

  const renderGoals = () => {
    return (
      <Col span={24}>
        <Card title="Goals" bordered={false}>
          Card content
        </Card>
      </Col>
    );
  };

  return (
    <AuthLayout>
      <Space
        direction="vertical"
        style={{ width: "100%", margin: "2rem", marginTop: "3rem" }}
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
          {renderAccountDetails()}
          <Col span={9}>
            <Row
              gutter={[16, 16]}
              style={{ display: "flex", alignItems: "center" }}
            >
              {renderProfileViews()}
              {renderAudienceInsights()}
            </Row>
          </Col>
          <Col span={6}>
            <Row gutter={[16, 16]}>
              {renderCampaigns()}
              {renderMilestones()}
              {renderGoals()};
            </Row>
          </Col>
        </Row>
      </Space>
    </AuthLayout>
  );
};

export default Dashboard;
