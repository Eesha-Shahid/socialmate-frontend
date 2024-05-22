import { Card, Col, Row, Image, Typography, Button, Space } from "antd";
import { IPostOptionCardProps } from "./types";
const { Title, Text} = Typography;

const PostOptionCard: React.FC<IPostOptionCardProps> = ({ onClick, imageSrc, title, description, disabled }) => {
  const width = title === 'Simple' ? '100%' : '80%';
  return (
    <Card bordered={false} style={{ marginTop: '1rem' }} hoverable >
      <Space direction="vertical" style={{ justifyContent: 'center' }}>
        <Row justify='center'>
          <Col>
            <Image preview={false} alt="example" src={imageSrc} style={{ width: width, marginBottom: '0rem 1rem' }} />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button disabled={disabled} onClick={onClick}>{title} Create</Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Text>{description}</Text>
          </Col>
        </Row>
      </Space>
    </Card>
  )
};

export default PostOptionCard;