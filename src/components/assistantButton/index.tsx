import { AIAssistantPen } from "@/assets/icons";
import { getColor } from "@/colors";
import Icon from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Text } = Typography;

const AssistantButton:React.FC<IAssistantButtonProps> = ({ loading, onClick }) => {
    return (
      <Button
        className="assistant-btn"
        loading={loading}
        style={{ background: getColor('lightGrey')}}
        icon={<Icon component={AIAssistantPen} />}
        onClick={onClick}
      >
        <Text className="gradient-text assistant-btn-text">Use Ai Assistant</Text>
      </Button>
    )
}

export default AssistantButton;