import { getColor } from "@/colors";
import { Col, Card, Row, Typography } from "antd";
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
        analyticsData !== null &&
        milestonesData !== null &&
        milestonesData.reach !== null &&
        milestonesData.reach !== undefined &&
        analyticsData.reach?.value !== null
    ) {
      remaining = milestonesData.reach - analyticsData.reach.value;
      percentage = analyticsData.reach.value / milestonesData.reach;
    }

    return (
      <>
        {milestonesData && analyticsData && (
          <Col span={24}>
            <Card title="Milestones" bordered={false}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Typography.Text className="text-mute">Reach</Typography.Text>
                  <h1>{milestonesData.reach}</h1>
                </Col>
                <Col>
                  <Typography.Text style={{ color: getColor("red") }}>
                    Remaning
                  </Typography.Text>
                  <h1>{remaining ? remaining : "Unknown"}</h1>
                </Col>
              </Row>
              <Row justify="center">
                <GaugeChart
                  style={{ fontWeight: "500", width: "50%" }}
                  nrOfLevels={2}
                  textColor="black"
                  animate={false}
                  arcsLength={[percentage, 1 - percentage]}
                  colors={[getColor("blue"), "#E5E5EF"]}
                  percent={percentage}
                  arcPadding={0.02}
                />
              </Row>
            </Card>
          </Col>
        )}
      </>
    );
  };

  export default MilestonesSummary