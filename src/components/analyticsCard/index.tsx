import { DownArrowIcon, UpArrowIcon } from "@/assets/icons";
import { getColor } from "@/colors";
import Icon from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";
const { Text } = Typography;

const AnalyticsCard: React.FC<IAnalyticsCardProps> = ({ title, data, icon }) => {
  console.log(data);

  let isDecreased = null;
  let percentage = null;

  if (data.last_value !== null && data.value !== null){
    isDecreased = data.last_value >= data.value ? true : false;
    percentage = Math.round(((data.value - data.last_value) / data.last_value) * 10);
  }

  return(
    <Card>
      <Space size='middle' direction="vertical">
        <Row gutter={[16, 16]} align="middle">
          <Col>
            <Icon component={icon} />
          </Col>
          <Col>
            <Text>{title}</Text>
          </Col>
        </Row>
        <Row>
          <span>{data?.value}</span>
        </Row>
        <Row>
          <Space>
            {isDecreased !== null && isDecreased ? <DownArrowIcon/> : <UpArrowIcon/>}
            <Text style={{ color: isDecreased ? getColor('green') : getColor('red') }}>{percentage}% vs last 7 days</Text>
          </Space>
        </Row>
      </Space>
    </Card>
  )
}

export default AnalyticsCard;