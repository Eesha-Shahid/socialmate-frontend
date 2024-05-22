import { getColor } from "@/colors";
import { Col, Card, Row, Typography, Empty } from "antd";
import GaugeChart from "react-gauge-chart";

const MilestonesSummary: React.FC<IMilestonesSummaryProps> = ({
  analyticsData,
  milestonesData,
  analyticsDataLoading,
  milestonesDataLoading
}) => {
  let remaining = null;
  let percentage = 0;
  if (
    analyticsData &&
    milestonesData &&
    milestonesData.reach !== null &&
    milestonesData.reach !== undefined &&
    analyticsData.reach?.value !== null
  ) {
    remaining = milestonesData.reach - analyticsData.reach.value;
    percentage = analyticsData.reach.value / milestonesData.reach;
  }

  return (
    <Col span={24}>
      <Card title="Milestones" bordered={false}>
        {milestonesData && analyticsData ? (
          <Row justify="space-between" align="middle" style={{ margin: '0.4rem 0' }}>
            <Col>
              <Typography.Text className="text-mute">Reach</Typography.Text>
              <h1>{milestonesData.reach}</h1>
            </Col>
            <Col>
              <GaugeChart
                style={{ fontWeight: "500", width: "80%" }}
                nrOfLevels={2}
                textColor="black"
                animate={false}
                arcsLength={[percentage, 1 - percentage]}
                colors={[getColor("peach"), "#E5E5EF"]}
                percent={percentage}
                arcPadding={0.02}
              />
            </Col>
            <Col>
              <Typography.Text style={{ color: getColor("red") }}>
                Remaining
              </Typography.Text>
              <h1>{remaining ? remaining : "Unknown"}</h1>
            </Col>
          </Row>
        ) : (
          <Empty />
        )}
      </Card>
    </Col>
  );
};

export default MilestonesSummary;
