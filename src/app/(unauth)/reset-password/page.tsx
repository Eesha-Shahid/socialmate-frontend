'use client'
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Space,
  Typography,
  Layout
} from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import Illustration from "../../../components/layouts/unauthLayout/illustration";

import { Footer } from '@/components';
import UnuthNavbar from '@/components/layouts/unauthLayout/navbar';
import { Content } from 'antd/es/layout/layout';
import { useAppDispatch } from "@/redux/hooks";
import { resetPassword } from "@/redux/actions/authAction";
const { Header } = Layout;

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {

  const dispatch = useAppDispatch();
  
  const onFinish: FormProps<UnAuthFieldTypes>['onFinish'] = (values: any) => {
    const queryParams = new URLSearchParams(window.location.search);
    const resetToken = queryParams.get("resetToken");
    if (resetToken){
      dispatch(resetPassword({ resetToken: resetToken, password: values.password }))
    }
  };
  
  const onFinishFailed: FormProps<UnAuthFieldTypes>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ background: '#F7F8FC', fontFamily: 'Poppins', marginTop: '1rem', minHeight: "97vh" }}>
      <Header style={{ height: '65px', background: 'none', justifyContent: 'space-between', alignItems: 'center' }}>
        <UnuthNavbar/>
      </Header>
      <Content>
        <Row style={{ alignItems: 'center', justifyContent: 'center'}} gutter={[16, 16]}>      
        <Illustration 
          heading='Forgot Password?'
          subheading= "No worries, we’ll send you reset instructions."
        />
        <Col
          span={8}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Space size="middle" direction="vertical" style={{ width: "100%" }}>
            <Col span={24}>
              <Title level={2} style={{ textAlign: "center" }}>
                Reset Password
              </Title>
            </Col>
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
                  <Form.Item<UnAuthFieldTypes>
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

                  <Form.Item<UnAuthFieldTypes>
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
                              "Passwords that you entered do not match!"
                            )
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
            <Col
                span={24}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <Text style={{ fontSize: "1rem", display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                  <Link href='/'>Back to Login</Link>
                </Text>
            </Col>
          </Space>
        </Col>
      </Row>
      </Content>
      <Footer />
    </Layout>
    
  );
};

export default ResetPassword;
