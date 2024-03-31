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
      console.log(remaining);
      console.log(percentage);
    }

    return (
      <>
        {goalsData && analyticsData && (
          <Col span={24}>
            <Card title="Goals" bordered={false}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Typography.Text className="text-mute">Reach</Typography.Text>
                  <h1>{goalsData.reach}</h1>
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
                  nrOfLevels={32}
                  textColor="black"
                  animate={false}
                  arcsLength={[percentage, 1 - percentage]}
                  colors={[getColor("blue"), "#E5E5EF"]}
                  percent={percentage}
                  arcPadding={0.02}
                  style={{ width: "50%" }}
                />
              </Row>
            </Card>
          </Col>
        )}
      </>
    );
  };

  export default GoalsSummary;