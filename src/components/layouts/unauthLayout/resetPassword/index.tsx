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

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
  type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agree?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ alignItems: 'center', justifyContent: 'center'}} gutter={[16, 16]}>      
      <Illustration heading='Forgot Password?' subheading="No worries, we’ll send you reset instructions." />
      <Col span={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Space size='middle' direction="vertical" style={{ width: '100%'}}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: 'center' }}>Reset Password</Title> 
        </Col>
        <Col span={24}>
          <Form
            requiredMark={false}
            layout="vertical"
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Password"
              name="password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8 },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The new password that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={24} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontSize: '1rem' }}>Back to <Link>Log in</Link></Text>
        </Col>
      </Space>
      </Col>
    </Row>
  );
};

export default ResetPassword;
