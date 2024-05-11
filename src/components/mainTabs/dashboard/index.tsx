import React, { useState } from "react";
import InstagramDashboard from "./instagram";
import { Avatar, Col, Row, Space, Typography } from "antd";
import { InstagramIcon, FacebookIcon, RedditIcon } from "@/assets/icons";
import Icon, { UserOutlined } from "@ant-design/icons";
import { AuthSelector, IntegrationsSelector } from "@/redux/reducers";
import { useSelector } from "react-redux";
const Dashboard: React.FC = () => {

  const { user } = useSelector(AuthSelector);
  const { integrations } = useSelector(IntegrationsSelector);
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);

  const handleAvatarClick = (index: number) => {
    setSelectedAvatars((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
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
      <div style={{ position: "absolute", bottom: '-10px', right: 0 }}>
        <Icon style={iconStyle} component={icon} />
      </div>
    </div>
    )
  }

  const renderTopBar = () => {
    return (
      <>
        <Col span={20}>
          <Typography.Title className="gradient-text">
            Hello {user?.username}
          </Typography.Title>
        </Col>
        <Col span={4}>
        <Row justify="center" align="middle" style={{ height: '200px' }}>
          <Col>
            <Avatar.Group size="large">
              {renderAvatar(1, FacebookIcon)}
              {renderAvatar(2, InstagramIcon)}
              {renderAvatar(3, RedditIcon)}
            </Avatar.Group>
          </Col>
        </Row>
        </Col>
      </>
    );
  };

  return (
    <Space
      direction="vertical"
      style={{ width: "97%", margin: "2rem", marginTop: "3rem" }}
    >
    <Row gutter={[16, 16]}>
        {renderTopBar()}
    </Row>
    <InstagramDashboard/>
    </Space>
  );
};

export default Dashboard;
