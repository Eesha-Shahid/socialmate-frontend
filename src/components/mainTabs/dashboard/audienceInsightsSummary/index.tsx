import { getColor } from "@/colors";
import { Col, Card, Row, Statistic, List } from "antd";

const AudienceInsightsSummary: React.FC<IAudienceInsightsSummaryProps> = ({
  data,
  dataLoading,
}) => {
  return (
    <>
      {data && (
        <Col span={24}>
          <Card
            title="Audience Insights"
            bordered={false}
            style={{ height: "100%" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Top Gender Age" bordered={false}>
                  <Row justify="space-around">
                    <Col span={11}>
                      <Statistic
                        title="Male"
                        valueStyle={{ color: getColor("blue") }}
                        value={data.audience_gender_age.male}
                        suffix="y/o"
                      />
                    </Col>
                    <Col span={11}>
                      <Statistic
                        title="Female"
                        valueStyle={{ color: getColor("pink") }}
                        value={
                          data.audience_gender_age.female
                        }
                        suffix="y/o"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Top Countries" bordered={false}>
                  <List
                    size="small"
                    dataSource={data.audience_country}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </>
  );
};

export default AudienceInsightsSummary;
