import React from "react";
import { Col, List, Space, Image, Typography, Row, Empty, Card } from "antd";
import VirtualList from "rc-virtual-list";
import { ContentCalendarSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import { TextWithGradientBorder, PostOptionCard } from "components";
import { useRouter } from "next/navigation";
const { Title, Text } = Typography

const SchedulerHub = () => {
  const router = useRouter();
  const { scheduledPosts } = useSelector(ContentCalendarSelector);

  const renderDrafts = () => {
    const renderHashtags = (hashtags: string[] | undefined) => (
      <Space>
        {hashtags?.map((tag: string, index: number) => (
          <React.Fragment key={index}>
            <TextWithGradientBorder 
              editable={false}
              text={`#${tag}`}
              gradientText={true}
              className={tag ? '' : 'text-mute'}
            />
          </React.Fragment>
        ))}
      </Space>
    );
  
    if (!scheduledPosts || scheduledPosts.length === 0) {
      return(
        <Card style={{ height: '14.3rem' }}>
          <Empty />
        </Card>
      )
    }
  
    return (
      <List>
        <VirtualList
          data={scheduledPosts}
          height={670}
          itemHeight={30}
          itemKey="_id"
        >
          {(item) => (
            <div className="ant-card draft-item" key={item._id}>
              <Row gutter={16}>
                <Col xs={24} md={16}>
                  <Space direction="vertical">
                    <Text strong>{item.caption}</Text>
                    <Text>{item.description}</Text>
                    {renderHashtags(item.hashtags)}
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Image src={item.media[0]} alt="Post" style={{ width: '100%' }} />
                </Col>
              </Row>
            </div>
          )}
        </VirtualList>
      </List>
    );
  };  

  const renderPostSelection = () => (
    <Row align='middle'>
      <Col span={11}>
        <PostOptionCard
          onClick={() => router.push('/create')}
          imageSrc="/images/SimpleCreate.png"
          title="Simple"
          description="Tap into AI for a 3-Step Traffic Boost for Postings on Daily Basis"
          disabled= {!Boolean(scheduledPosts)}
        />
      </Col>
      <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ alignContent: 'center', fontSize: '1.2rem' }}>OR</Text>
      </Col>
      <Col span={11}>
        <PostOptionCard
          onClick={() => router.push('/create')}
          imageSrc="/images/AdvancedCreate.png"
          title="Advanced"
          description="Elevate Strategies with Advanced Tools for Ads and Influencers"
          disabled= {!Boolean(scheduledPosts)}
        />
      </Col>
    </Row>
  )

  return (
    <Row gutter={[16, 16]} style={{ margin: "2rem" }}>
      <Col span={16}>
        <Title style={{ textAlign: 'center' }} className="gradient-text">
          How would you like to create your post?
        </Title>
        <Row justify='center'>
          {renderPostSelection()}
        </Row>
      </Col>
      <Col span={8}>
        <Title className="gradient-text">
          Your Scheduled Posts
        </Title>
        {renderDrafts()}
      </Col>
    </Row>
  );
};

export default SchedulerHub;
