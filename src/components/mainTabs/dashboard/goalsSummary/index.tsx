import { getColor } from "@/colors";
import { Col, Card, Row, Typography } from "antd";
import GaugeChart from "react-gauge-chart";

const GoalsSummary: React.FC<IGoalsSummaryProps> = ({
    analyticsData,
    goalsData,
    analyticsDataLoading,
    goalsDataLoading
  }) => {
    let remaining = null;
    let percentage = 0;
    if (
      analyticsData !== null &&
      goalsData !== null &&
      goalsData !== undefined &&
      goalsData.reach !== null &&
      goalsData.reach !== undefined &&
      analyticsData.reach?.value !== null
    ) {
      remaining = goalsData.reach - analyticsData.reach.value;
      percentage = analyticsData.reach.value / goalsData.reach;
    }

    return (
      <>
        {goalsData && analyticsData && (
          <Col span={24}>
            <Card title="Goals" bordered={false}>
              <Row justify="space-between" align="middle" style={{ margin: '0.3rem 0' }}>
                <Col>
                  <Typography.Text className="text-mute">Reach</Typography.Text>
                  <h1>{goalsData.reach}</h1>
                </Col>
                <Col>
                  <GaugeChart
                    style={{ fontWeight: "400", width: "80%" }}
                    nrOfLevels={32}
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
                    Remaning
                  </Typography.Text>
                  <h1>{remaining ? remaining : "Unknown"}</h1>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </>
    );
  };

  export default GoalsSummary;