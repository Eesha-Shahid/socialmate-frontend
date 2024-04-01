import { GoogleIcon } from "@/assets/icons";
import Icon from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Button,
  Checkbox,
  Form,
  Input,
  FormProps,
  Space,
  Typography,
  Divider,
} from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import Illustration from "../illustration";
import UnauthForm from "../unauthForm";

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
  const handleFinish = (values: any) => {
    console.log("Form submitted with values:", values);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed with error:", errorInfo);
  };

  return (
    <Row style={{ alignItems: 'center', justifyContent: 'center'}} gutter={[16, 16]}>      
      <Illustration heading='Forgot Password?' subheading="No worries, we’ll send you reset instructions." />
      <UnauthForm
        label="Reset Password"
        action="Reset Password"
        fields={{
          password: true,
          confirmPassword: true,
        }}
        extra="Back to"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      />
    </Row>
  );
};

export default ResetPassword;
