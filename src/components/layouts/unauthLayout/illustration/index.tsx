import { Col, Typography, Image } from "antd";
const { Text } = Typography;

const Illustration: React.FC<IllustrationProps> = ({ heading, subheading }) => {
    return (
      <Col span={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image
          preview={false}
          src={"/images/illustration-1.png"}
          alt="Illustration"
          style={{ width: "100%", maxWidth: "600px" }}
        />
        <Text style={{ fontSize: '1rem' }} className="text-bold">{heading}</Text>
        <Text style={{ fontSize: '1rem' }}>{subheading}</Text>
      </Col>
    );
  };

  export default Illustration;