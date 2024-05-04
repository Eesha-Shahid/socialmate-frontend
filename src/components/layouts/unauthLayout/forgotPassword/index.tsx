import { Row } from "antd";
import React from "react";
import Illustration from "../illustration";
import UnauthForm from "../unauthForm";

const ForgotPassword: React.FC = () => {
  const handleFinish = (values: any) => {
    console.log("Form submitted with values:", values);
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Form submission failed with error:", errorInfo);
  };

  return (
    // <Row
    //   style={{ alignItems: "center", justifyContent: "center" }}
    //   gutter={[16, 16]}
    // >
    //   <Illustration
    //     heading="Forgot Password?"
    //     subheading="No worries, we’ll send you reset instructions."
    //   />
      <UnauthForm
        // label="Forgot Password"
        // action="Verify Email"
        // fields={{
        //   email: true
        // }}
        // extra="Back to Login"
        // onFinish={handleFinish}
        // onFinishFailed={handleFinishFailed}
      />
    // </Row>
  );
};

export default ForgotPassword;
