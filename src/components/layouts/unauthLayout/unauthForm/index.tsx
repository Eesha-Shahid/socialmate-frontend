'use client'
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
import React, { useState } from "react";
import { Illustration } from "components";
import { useAppDispatch } from "@/redux/store";
import { forgotPassword, googleLogin, googleSignup, login, register } from "@/redux/actions/authAction";
import { useSelector } from "react-redux";
import { AuthSelector } from "@/redux/reducers";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
const { Title, Text } = Typography;

const UnauthForm = () => {

  const dispatch = useAppDispatch();
  const [currentLabel, setCurrentLabel] = useState<string>("Sign In");
  const { loading } = useSelector(AuthSelector);

  const switchForm = (newLabel: string) => {
    setCurrentLabel(newLabel);
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    dispatch(googleLogin(credentialResponse))
  };

  const handleGoogleSignup = async (credentialResponse: any) => {
    dispatch(googleSignup(credentialResponse))
  };

  const getFormFields = () => {
    switch (currentLabel) {
      case "Sign Up":
        return {
          username: true,
          email: true,
          password: true,
          confirmPassword: true,
          agree: true,
        };
      case "Sign In":
        return {
          email: true,
          password: true,
        };
      case "Forgot Password":
        return {
          email: true,
        };
      default:
        return {
          username: true,
          email: true,
          password: true,
          confirmPassword: true,
          agree: true,
        };
    }
  };

  const getFormExtra = () => {
    switch (currentLabel) {
      case "Sign In":
        return (
          <Text style={{ fontSize: "1rem" }}>
            Don&apos;t have an account? <Link onClick={() => switchForm("Sign Up")}>Sign Up</Link>
          </Text>
        );
      case "Sign Up":
        return (
          <Text style={{ fontSize: "1rem" }}>
            Already have an account? <Link onClick={() => switchForm("Sign In")}>Sign In</Link>
          </Text>
        );
      case "Forgot Password":
        return (
          <Text style={{ fontSize: "1rem", display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <Link onClick={() => switchForm("Sign In")}>Back to Login</Link>
          </Text>
        );
    }
  };

  const getFormAction = () => {
    switch (currentLabel) {
      case "Sign Up":
      case "Sign In":
        return currentLabel
      case "Forgot Password":
        return "Verify Email";
    }
  };

  const getIllustrationData = () => {
    switch (currentLabel) {
      case "Sign In":
        return{
          heading: "Effortless Access, Endless Possibilities:",
          subheading: "Log In to SocialMate."
        }
      case "Sign Up":
        return{
          heading: "Embark on Your Social Adventure:",
          subheading: "Sign Up with SocialMate Today!"
        }
      case "Forgot Password":
      default:
        return{
          heading: "Effortless Access, Endless Possibilities:",
          subheading: "Log In to SocialMate."
        }
    }
  }

  const onFinish: FormProps<UnAuthFieldTypes>['onFinish'] = (values: any) => {
    switch (currentLabel) {
      case "Sign Up":
        dispatch(register({ username: values.username, email: values.email, password: values.password }));
        break;
      case "Sign In":
        dispatch(login({ email: values.email, password: values.password }));
        break;
      case "Forgot Password":
        dispatch(forgotPassword({ email: values.email }));
    }
  };
  
  const onFinishFailed: FormProps<UnAuthFieldTypes>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formFields = getFormFields();
  const illustrationData = getIllustrationData();

  return (
    <Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: '3rem'}} gutter={[16, 16]}>      
      <Illustration heading={illustrationData.heading} subheading={illustrationData.subheading} />
      <Col
        span={8}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Col span={12} style={{ display: 'block' }}>
            <Title level={2} className="infinite-typewriter">
              {currentLabel}
            </Title>
          </Col>
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
          <Row justify={'center'}>
          {(currentLabel == 'Sign Up') && (
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                <GoogleLogin
                  size='large'
                  text='signup_with'
                  useOneTap={true}
                  onSuccess={handleGoogleSignup}
                  onError={() => {console.log("Signup Failed");}}
                />
              </GoogleOAuthProvider>
            )}
            {(currentLabel == 'Sign In') && (
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                <GoogleLogin
                  useOneTap={true}
                  onSuccess={handleGoogleLogin}
                  onError={() => {console.log("Login Failed");}}
                />
              </GoogleOAuthProvider>     
            )}
            </Row>
            <Divider>OR</Divider>
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
              {formFields.username && (
                  <Form.Item<UnAuthFieldTypes>
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

              {formFields.email && (
                <Form.Item<UnAuthFieldTypes>
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

              {formFields.password && (
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
              )}

              {formFields.confirmPassword && (
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
              )}

              {formFields.agree && (
                <Form.Item<UnAuthFieldTypes>
                  name="agree"
                  valuePropName="checked"
                  wrapperCol={{ span: 24 }}
                >
                  <Checkbox>
                    I agree to the <Link>terms of service</Link>
                  </Checkbox>
                </Form.Item>
              )}

              {currentLabel == 'Sign In' && (
                <Text style={{ fontSize: "1rem", display: "flex", justifyContent: "flex-end", marginBottom: '1rem' }}>
                  <Link onClick={() => switchForm("Forgot Password")}>Forgot Password?</Link>
                </Text>
              )}

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  {getFormAction()}
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
              {getFormExtra()}
          </Col>
        </Space>
      </Col>
    </Row>
  );
};

export default UnauthForm;
