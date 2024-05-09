import { FacebookIcon, InstagramIcon, RedditIcon } from '@/assets/icons';
import { ImageCarousel, AssistantButton, TextWithGradientBorder, AiAssistant} from 'components';
import Icon, { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

const StepOne = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const media = [
    "https://i.pinimg.com/736x/af/c7/c7/afc7c7e7af051ddb4538b3fc0847ad7b.jpg",
    "https://i.pinimg.com/564x/31/e6/1f/31e61f2ea320681d1be0a95371e1e6bb.jpg",
    "https://i.pinimg.com/564x/f2/42/31/f24231415b31368937dfbcb259043aeb.jpg"
  ]

  const handleAvatarClick = (index: number) => {
    setSelectedAvatars((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderAvatar = (index: number, icon: any ) => {
    const isSelected = selectedAvatars.includes(index);
    const avatarStyle = isSelected
      ? { border: "5px solid white", cursor: "pointer" }
      : { filter: "grayscale(100%)", border: "5px solid white", cursor: "pointer" };

    const iconStyle = isSelected
    ? {}
    : { filter: "grayscale(100%)" }

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
            style={{ ...avatarStyle, transition: "filter 0.3s" }}
            size={80}
            icon={<UserOutlined />}
          />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: '-20px', right: 0 }}>
        <Icon style={iconStyle} component={icon} />
      </div>
    </div>
    )
  }

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
      {/* Avatar Container */}
      <Row justify="center" align="middle" style={{ height: '200px' }}>
        <Col>
          <Avatar.Group size="large">
            {renderAvatar(1, FacebookIcon)}
            {renderAvatar(2, InstagramIcon)}
            {renderAvatar(3, RedditIcon)}
          </Avatar.Group>
        </Col>
      </Row>

      {/* Two Column Layout */}
      <Row justify="center" gutter={16}>
        <Col xs={24} md={8}>
          <ImageCarousel media={media}/>
        </Col>
        <Col xs={24} md={16}>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Caption:</Text>
              <AssistantButton loading={false} onClick={toggleSidebar}/>
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
              <AssistantButton loading={false} onClick={toggleSidebar}/>
              <TextWithGradientBorder 
                placeholder="Start Writing"
                // text={"Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl. Vania is a  cutu girl. Eesha is a happy girl..."}
                maxLength={200}
                // onTextChange={(newText) => handleTextChange(type, newText)}
                emoji={true}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Hashtags:</Text>
              <AssistantButton loading={false} onClick={toggleSidebar}/>
            </Col>
            {renderHashtags(['good news','entertainment'])}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Text strong>Scheduled Time:</Text>
              <AssistantButton loading={false} onClick={toggleSidebar}/>
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
      <AiAssistant onClose={toggleSidebar} visible={sidebarVisible}/>
    </>
  ) 
}

export default StepOne;
