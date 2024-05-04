import React, { useEffect, useState } from "react";
import { Avatar, Card, Col, List, Row, Space, Typography, Image, Steps, Button, Checkbox, Form, Input, DatePicker, DatePickerProps, TimePicker, Divider } from "antd";
import VirtualList from "rc-virtual-list";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/store";
import { generateCaption } from "@/redux/actions/schedulerHubAction";
import { SchedulerHubSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";

const SchedulerHub = () => {
  const dispatch = useAppDispatch();
  const { generatedCaption, generatedCaptionLoading } = useSelector(SchedulerHubSelector);
  const [form] = Form.useForm();
  const [createPost, setCreatePost ] = useState(false);

  useEffect(()=>{
    if (generatedCaption != null) {
      form.setFieldsValue({ caption: generatedCaption.caption });
    }
  },[form, generatedCaption])
  
  const handleFinish = (values: any) => {
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

  const [open, setOpen] = useState(false);

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const cardData = [
    { title: "Card Title 3", content: "Card content for the third card" },
    { title: "Card Title 4", content: "Card content for the fourth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
    { title: "Card Title 5", content: "Card content for the fifth card" },
  ];

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
              onFinish={handleFinish}
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

  return (
    <>
      {!createPost && (
        <Row gutter={[16, 16]} style={{ margin: "2rem" }}>
          <Col span={14}>
            <Typography.Title className="gradient-text">
              How would you like to create your post?
            </Typography.Title>
            <Card onClick={() => setCreatePost(true)}  bordered={false}>
              <Row justify="center">
                <Col>
                  <Image
                    preview={false}
                    alt="example"
                    src="/images/SimpleCreate.png"
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Typography.Title level={4}>Simple Create</Typography.Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Typography.Text>
                  Tap into AI for a 3-Step Traffic Boost
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
            <Card onClick={() => setCreatePost(true)}  bordered={false} style={{ marginTop: '1rem' }}>
              <Row justify="center">
                <Col>
                  <Image
                    preview={false}
                    alt="example"
                    src="/images/AdvancedCreate.png"
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Typography.Title level={4}>Advanced Create</Typography.Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Typography.Text>
                  Elevate Strategies with Advanced Tools for Ads and Influencers
                  </Typography.Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={10}>
            <Typography.Title className="gradient-text">
              Your Drafts
            </Typography.Title>
            <List>
              <VirtualList
                data={cardData}
                height={670}
                itemHeight={47}
                itemKey="email"
                // onScroll={onScroll}
                // https://ant.design/components/list
              >
                {(item) => (
                  <List.Item className="ant-card" style={{ backgroundColor: 'white', borderRadius: '10px', padding: '2rem', marginBottom: '1rem'}} key={item.title}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={
                            "data:image/png;base64,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"
                          }
                        />
                      }
                      title={<a href="https://ant.design">{item.content}</a>}
                      description={item.content + item.content}
                    />
                    <div>
                      <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />
                      <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                      />
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />
                      <Image
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
        </Row>
      )}
      {createPost && renderPostCreator()}
    </>
  );
};

export default SchedulerHub;
