import { InstagramMediumIcon } from "@/assets/icons";
import Icon, { UserOutlined } from "@ant-design/icons";
import { Col, Card, Space, Row, Avatar, Typography, Empty } from "antd";
const { Title, Text } = Typography;

const AccountDetailsSummary: React.FC<IAccountDetailsSummaryProps> = ({
  data,
  dataLoading,
}) => {
  const renderTimePeriodStats = (label: string, value: number | null) => {
    return (
      <Col span={8} style={{ textAlign: "center" }}>
        <div className="gradient-text">{value || "Unknown"}</div>
        <div className="text-bold">{label}</div>
      </Col>
    );
  };

  return (
    <>
      {data ? (
        <Col span={24}>
          <Card style={{ height: "100%" }} bordered={false}>
            <Space size="middle" direction="vertical" style={{ width: "100%" }}>
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
                            src={data.profile_picture_url}
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
                      {data.name}
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
                        @{data.username}
                      </Text>
                      <Text style={{ textAlign: "center" }}>
                        {data.bio}
                      </Text>
                      <Text
                        className="text-bold"
                        style={{ textAlign: "center" }}
                      >
                        {data.website}
                      </Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                {renderTimePeriodStats(
                  "Posts",
                  data.media_count
                )}
                {renderTimePeriodStats(
                  "Followers",
                  data.followers_count
                )}
                {renderTimePeriodStats(
                  "Following",
                  data.follows_count
                )}
              </Row>
            </Space>
          </Card>
        </Col>
      ) : (
        <Col span={24}>
          <Card style={{ height: '30.5rem' }} title="Account Details Summary" bordered>
            <Empty />
          </Card>
        </Col>
      )}
    </>
  );
};

export default AccountDetailsSummary;
