import { Col, Typography, Image } from "antd";
const { Text } = Typography;
import dynamic from "next/dynamic";

const Illustration: React.FC<IllustrationProps> = ({ heading, subheading }) => {
  const PlayerWithNoSSR = dynamic(
    () => import('@lottiefiles/react-lottie-player').then(module => module.Player),
    {ssr: false},
  );

    return (
      <Col span={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PlayerWithNoSSR
          src='https://lottie.host/fe90de16-679b-427a-aa80-58dd0277bbff/kihIa4cgGl.json'
          className="player"
          loop
          autoplay
        />
        <Text style={{ fontSize: '1rem' }} className="text-bold">{heading}</Text>
        <Text style={{ fontSize: '1rem' }}>{subheading}</Text>
      </Col>
    );
  };

  export default Illustration;