import { Col, Card, Row, Empty } from "antd";

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
      {data ? (
        <Card title="Profile Views" bordered={false}>
          <Row gutter={[16, 16]}>
            {renderTimePeriodStats("Day", data.day_views)}
            {renderTimePeriodStats("Week", data.week_views)}
            {renderTimePeriodStats("Month", data.month_views)}
          </Row>
        </Card>
      ) : (
        <Card title="Profile Views Summary" bordered>
          <Empty />
        </Card>
      )}
    </>
  );
};

export default ProfileViewsSummary;
