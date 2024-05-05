'use client'
import { InstagramIcon } from '@/assets/icons';
import { ImageCarousel, TextWithGradientBorder } from 'components';
import Icon, { UserOutlined } from '@ant-design/icons';
import { Steps, Row, Col, Typography, Button, Avatar, Space } from 'antd';
import { useState } from 'react';
import React from 'react';
const { Text } = Typography;

interface ICreateAdProps {

}

const CreateAd: React.FC<ICreateAdProps> = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);

  const media = [
    "https://i.pinimg.com/736x/af/c7/c7/afc7c7e7af051ddb4538b3fc0847ad7b.jpg",
    "https://i.pinimg.com/564x/31/e6/1f/31e61f2ea320681d1be0a95371e1e6bb.jpg",
  ]

  const handleAvatarClick = (index: number) => {
    setSelectedAvatars((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const renderAvatar = (index: number) => {
    const isSelected = selectedAvatars.includes(index);
    const avatarStyle = isSelected
      ? { border: "5px solid white", cursor: "pointer" }
      : { filter: "grayscale(100%)", border: "5px solid white", cursor: "pointer" };

    const background = isSelected
    ? "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)"
    : "grey"

    return (
    <div 
      onClick={() => handleAvatarClick(index)}
      style={{ position: "relative", display: "inline-block", margin: '0 10px' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
      <div
        style={{
          padding: "0.1rem",
          borderRadius: "50%",
          overflow: "hidden",
          background: background,
          border: "0.5px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div style={{ borderRadius: "50%", overflow: "hidden" }}>
          <Avatar
            src="https://i.pinimg.com/564x/18/9c/03/189c038c25664bb3b2ad077b6e58b1e3.jpg"
            // style={{ border: "5px solid white", cursor: 'pointer' }}
            style={{ ...avatarStyle, transition: "filter 0.3s" }}
            size={80}
            icon={<UserOutlined />}
          />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: '-20px', right: 0 }}>
        <Icon component={InstagramIcon} />
      </div>
    </div>
    )
  }

  const renderStepper = () => (
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
  )

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

  return (
    <>
      {/* Stepper */}
      {renderStepper()}

      {/* Avatar Container */}
      <Row justify="center" align="middle" style={{ height: '200px' }}>
        <Col>
          <Avatar.Group size="large">
            {renderAvatar(1)}
            {renderAvatar(2)}
            {renderAvatar(3)}
          </Avatar.Group>
        </Col>
      </Row>

      {/* Two Column Layout */}
      <Row justify="center" gutter={16}>
        <Col xs={24} md={6}>
          <ImageCarousel media={media}/>
        </Col>
        <Col xs={24} md={18}>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Caption:</Text>
              <TextWithGradientBorder 
                placeholder="Start Writing"
                maxLength={100}
                // onTextChange={(newText) => handleTextChange(type, newText)}
                emoji={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Description:</Text>
              <TextWithGradientBorder 
                placeholder="Start Writing"
                text={"Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl..."}
                maxLength={200}
                // onTextChange={(newText) => handleTextChange(type, newText)}
                emoji={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Hashtags:</Text>
            </Col>
            {renderHashtags(['good news','entertainment'])}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Scheduled Time:</Text>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Button type='primary'>Tag People</Button>
              <Button type='primary'>Add Media</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      </>
  );
};

export default CreateAd;
