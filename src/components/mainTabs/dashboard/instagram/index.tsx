import { useSelector } from "react-redux";
import { ContentCalendarSelector, InstagramSummarySelector } from "@/redux/reducers";
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
import { Button, Card, Carousel, Col, Row, Space, Typography, Image, Statistic, List } from "antd";
import { useEffect } from "react";
import AccountDetailsSummary from "../accountDetailsSummary";
import AnalyticsSummary from "../analyticsSummary";
import AudienceInsightsSummary from "../audienceInsightsSummary";
import GoalsSummary from "../goalsSummary";
import MilestonesSummary from "../milestonesSummary";
import ProfileViewsSummary from "../profileViewsSummary";
import { useRouter } from "next/navigation";
import { getColor } from "@/colors";

const { Text } = Typography;

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

  const renderCampaigns = () => {
    return (
      // <Card title="Campaigns" bordered={false}>
      //   <Button type="primary" style={{ marginBottom: '1rem' }} onClick={()=> router.push('/campaign')}>Influencer Campaign</Button>
      //   <Button type="primary">Advertisement Campaign</Button>
      // </Card>
      <Card style={{ 
        background: 'linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)' ,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.4rem 0'
      }} bordered={false}>
        <Space size='large' direction="vertical" style={{ alignItems: 'center' }}>
            <Text style={{ color:"white", fontSize: '1rem' }}>Want to access Premium tools?</Text>
            <Text style={{ color:"white" }}>Check out our premium package.</Text>
            <Row align='middle' justify='space-between'>
              {/* <Button style={{ background: 'white', borderRadius: '20px', marginRight: '0.4rem' }}><span style={{ fontSize: '1rem' }} className="gradient-text">Upgrade to Pro</span></Button> */}
              <Button style={{ background: 'white', borderRadius: '20px', marginRight:'1rem' }} onClick={() => router.push('/influencer-campaign')}><span style={{ fontSize: '1rem' }} className="gradient-text">Influencers</span></Button>
              <Button style={{ background: 'white', borderRadius: '20px' }} onClick={() => router.push('/advertisement-campaign')}><span style={{ fontSize: '1rem' }} className="gradient-text">Advertisements</span></Button>
            </Row>
        </Space>
      </Card>
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
          {renderCampaigns()}
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
          <Row style={{ marginBottom: '1rem' }}>
            <Col span={24}>
              {profileViewsSummary !== null && (
                <ProfileViewsSummary
                  data={profileViewsSummary}
                  dataLoading={profileViewsSummaryLoading}
                />
              )}
            </Col>
          </Row>
          <Row gutter={[16,16]}>
            <Col span={6}>
              <Card title="Top Age" bordered={false}>
                <Row gutter={[16, 16]} style={{ padding: '0.4rem 0' }}>
                  <Col span={24}>
                    <Statistic
                      title="Male"
                      valueStyle={{ color: getColor("blue") }}
                      value={audienceInsightsSummary?.audience_gender_age.male || ''}
                      suffix="y/o"
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="Female"
                      valueStyle={{ color: getColor("pink") }}
                      value={
                        audienceInsightsSummary?.audience_gender_age.female || ''
                      }
                      suffix="y/o"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={18}>
              <Card title="Top Countries" bordered={false}>
                <List
                  style={{ padding: '1.3rem 0' }}
                  size="small"
                  dataSource={audienceInsightsSummary?.audience_country}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
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