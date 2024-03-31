import { Col, Card, Row } from "antd";

const ProfileViewsSummary: React.FC<IProfileViewsSummaryProps> = ({
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
      {data && (
        <Col span={24}>
          <Card title="Profile Views" bordered={false}>
            <Row gutter={[16, 16]}>
              {renderTimePeriodStats("Day", data.day_views)}
              {renderTimePeriodStats("Week", data.week_views)}
              {renderTimePeriodStats("Month", data.month_views)}
            </Row>
          </Card>
        </Col>
      )}
    </>
  );
};

export default ProfileViewsSummary;
