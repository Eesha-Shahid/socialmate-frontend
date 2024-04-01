import { Row } from "antd";
import React from "react";
import Illustration from "../illustration";
import UnauthForm from "../unauthForm";

const Login: React.FC = () => {
  const handleFinish = (values: any) => {
    console.log("Form submitted with values:", values);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed with error:", errorInfo);
  };

  return (
    <Row
      style={{ alignItems: "center", justifyContent: "center" }}
      gutter={[16, 16]}
    >
      <Illustration
        heading="Effortless Access, Endless Possibilities:"
        subheading="Log In to SocialMate."
      />
      <UnauthForm
        label="Sign In"
        action="Sign In"
        fields={{
          email: true,
          password: true,
        }}
        extra="Don&apos;t have an account?"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      />
    </Row>
  );
};

export default Login;
