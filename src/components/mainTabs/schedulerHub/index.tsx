import React, { useEffect, useState } from "react";
import { Col, List, Space, Image, Steps, Button, Form, Input, DatePicker, TimePicker, Divider, Typography, Row, Card } from "antd";
import VirtualList from "rc-virtual-list";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/store";
import { generateCaption } from "@/redux/actions/schedulerHubAction";
import { ContentCalendarSelector, SchedulerHubSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { TextWithGradientBorder, PostOptionCard, AnalyticsCard } from "components";
import { useRouter } from "next/navigation";
import { CommentsIcon } from "@/assets/icons";
const { Title, Text } = Typography

const SchedulerHub = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { generatedCaption, generatedCaptionLoading } = useSelector(SchedulerHubSelector);
  const { scheduledPosts } = useSelector(ContentCalendarSelector);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if (generatedCaption != null) {
      form.setFieldsValue({ caption: generatedCaption.caption });
    }
  },[form, generatedCaption])

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

  const renderDrafts = () => (
    <List>
      {scheduledPosts && (
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
      )}
    </List>
  );

  const renderPostSelection = () => (
    <Row style={{ justifyContent: 'space-evenly' }} align='middle'>
      <Col span={11}>
        <PostOptionCard
          onClick={() => router.push('/create')}
          imageSrc="/images/SimpleCreate.png"
          title="Simple"
          description="Tap into AI for a 3-Step Traffic Boost for Postings on Daily Basis"
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
        />
      </Col>
    </Row>
  )
  
  const handleFinishSuccess = (values: any) => {
    const { queryString } = values;
    if (queryString){
      dispatch(generateCaption(queryString));
    }

    console.log("Form submission success ");
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed with error:", errorInfo);
  };

  const handleCaptionGenerate = () => {
    const queryString = form.getFieldValue('queryString');
    if (queryString){
      dispatch(generateCaption(queryString));
    }
  }

  const renderPostCreator = () => {
    return(
      <>
        <Steps
          style={{ marginTop: '3rem' }}
          size="small"
          current={0}
          responsive={true}
          items={[
            {
              title: 'Creative',
            },
            {
              title: 'Targeting & Delivery',
            },
            {
              title: 'Payment',
            },
          ]}
        />
        <Space direction="vertical" style={{ width: '100%'}}>
          <Col style={{ marginTop: '2rem', marginBottom: '2rem'}} span={24}>
            <Form form={form}
              validateTrigger= "onBlur"
              requiredMark={false}
              layout="vertical"
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 600 }}
              onFinish={handleFinishSuccess}
              onFinishFailed={handleFinishFailed}
              autoComplete="off"
            >
              <Form.Item
              label="Caption"
              name="caption"
              hasFeedback
              >
              <TextArea rows={8} />
              </Form.Item>

              <Divider>OR</Divider>

              <Form.Item
              label="Keyword"
              name="queryString"
              hasFeedback
              >
              <Input
                addonAfter={
                  <Button type="primary" loading={generatedCaptionLoading} onClick={() => handleCaptionGenerate()}>
                    AI Generate
                  </Button>
                }
              />
              </Form.Item>

              <Form.Item
                label="DatePicker"
                name="DatePicker"
              >
                <DatePicker />
              </Form.Item>

              <TimePicker
                open={open}
                onOpenChange={setOpen}
                renderExtraFooter={() => (
                  <Button size="small" type="primary" onClick={() => setOpen(false)}>
                    OK
                  </Button>
                )}
              />

            </Form>
          </Col>
          <Col span={8}>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>
                Next
              </Button>
            </Form.Item>
          </Col>
        </Space>
      </>
    )
  }

  const item = {
    title: "Hello",
    data: {
      value: 10,
      last_value: 8
    },
    icon: CommentsIcon
  }

  return (
    <Row gutter={[16, 16]} style={{ margin: "2rem" }}>
      <Col span={16}>
        <Row>
          <Title style={{ textAlign: 'center' }} className="gradient-text">
            How would you like to create your post?
          </Title>
          {renderPostSelection()}
        </Row>
        <Row>
          <Title style={{ textAlign: 'center' }} className="gradient-text">
            Summary
          </Title>
        </Row>
        <Row>
            <Col span={6}>
              <AnalyticsCard
                title={item.title}
                data={item.data}
                icon={item.icon}
              />
            </Col>
            <Col span={6}>
              <AnalyticsCard
                title={item.title}
                data={item.data}
                icon={item.icon}
              />
            </Col>
            <Col span={6}>
              <AnalyticsCard
                title={item.title}
                data={item.data}
                icon={item.icon}
              />
            </Col>
            <Col span={6}>
              <AnalyticsCard
                title={item.title}
                data={item.data}
                icon={item.icon}
              />
            </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Title className="gradient-text">
          Your Drafts
        </Title>
        {renderDrafts()}
      </Col>
    </Row>
  );
};

export default SchedulerHub;
