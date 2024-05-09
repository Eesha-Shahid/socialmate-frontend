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
import { loadUser } from "@/redux/actions/authAction";
import { Button, Card, Col, Row, Space } from "antd";
import { useEffect } from "react";
import AccountDetailsSummary from "../accountDetailsSummary";
import AnalyticsSummary from "../analyticsSummary";
import AudienceInsightsSummary from "../audienceInsightsSummary";
import GoalsSummary from "../goalsSummary";
import MilestonesSummary from "../milestonesSummary";
import ProfileViewsSummary from "../profileViewsSummary";
import { useRouter } from "next/navigation";

const InstagramDashboard:React.FC = () => {
  const router = useRouter();
  
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
    dispatch(loadUser());
    dispatch(getAnalyticsSummary());
    dispatch(getProfileViewsSummary());
    dispatch(getAccountDetailsSummary());
    dispatch(getAudienceInsightsSummary());
    dispatch(getMilestonesSummary());
    dispatch(getGoalsSummary());
  }, []);



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
          <Button onClick={()=> router.push('/campaign')}>Influencer Campaign</Button>
          <Button>Advertisement Campaign</Button>
        </Card>
      </Col>
    );
  };

  return (
    <Space size='middle' direction="vertical" style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col span={18}>
            {/* {renderUpcomingPosts()} */}
            {analyticsSummary !== null && (
              <AnalyticsSummary
                data={analyticsSummary}
                dataLoading={analyticsSummaryLoading}
              />
            )}
          </Col>
          <Col span={6}>
            {profileViewsSummary !== null && (
              <ProfileViewsSummary
                data={profileViewsSummary}
                dataLoading={profileViewsSummaryLoading}
              />
            )}
          </Col>
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
  )
}

export default InstagramDashboard