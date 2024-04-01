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

const { Title, Text } = Typography;

const UnauthForm: React.FC<IUnauthFormProps> = ({
  label,
  action,
  fields,
  extra,
  onFinish,
  onFinishFailed,
}) => {

  return (
    <Col
      span={8}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: "center" }}>
            {label}
          </Title>
        </Col>
        {(label == 'Sign Up' || label == 'Sign In') && (
          <>
            <Col span={24}>
              <Button
                  style={{
                  border: "none",
                  boxShadow: "0px 1px 4px 0px #9972CB",
                  borderRadius: "10px",
                  padding: "1.5rem 0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  }}
                  htmlType="submit"
                  icon={<Icon component={GoogleIcon} />}
                  block
              >
                  {label} with Google
              </Button>
            </Col>
            <Divider>OR</Divider>
          </>
        )}
        <Col span={24}>
          <Form
            validateTrigger= "onBlur"
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
            {fields.username && (
                <Form.Item<FieldType>
                label="Username"
                name="username"
                hasFeedback
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
                >
                <Input />
                </Form.Item>
            )}

            {fields.email && (
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            )}

            {fields.password && (
              <Form.Item<FieldType>
                label="Password"
                name="password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 7 },
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            {fields.confirmPassword && (
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
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            {fields.agree && (
              <Form.Item<FieldType>
                name="agree"
                valuePropName="checked"
                wrapperCol={{ span: 24 }}
              >
                <Checkbox>
                  I agree to the <Link>terms of service</Link>
                </Checkbox>
              </Form.Item>
            )}

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>
                {action}
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {(label == 'Sign Up' || label == 'Sign In') && (
            <Col
            span={24}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Text style={{ fontSize: "1rem" }}>
                {extra} <Link>{label == 'Sign In' ? 'Sign Up' : 'Log In' }</Link>
            </Text>
            </Col>
        )}
      </Space>
    </Col>
  );
};

export default UnauthForm;
