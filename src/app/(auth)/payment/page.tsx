'use client'
import { addPaymentMethod } from "@/redux/actions/subscriptionAction";
import { useAppDispatch } from "@/redux/store";
import { IPaymentMethod } from "@/redux/types/subscription/reducer";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography;
const { Item } = Form;

const Payment: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)"

  const handleSubmit = (values: IPaymentMethod) => {
    dispatch(addPaymentMethod(values));
    router.push('/auth')
  };

  return (
    <>
      <div
        style={{ background: borderColor, borderRadius: '20px', height: 'auto', margin: '5rem' }}
        className="outer-gradient-border"
      >
        <div
            style={{ padding: '2rem', borderRadius: '18px', height: 'auto' }}
            className='inner-text'
        >
          <div>
            <Title style={{ textAlign: 'center', marginBottom: '2rem' }} className="gradient-text">
              Add Payment Method
            </Title>
            <Form
              name="paymentForm"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Item
                      label="Card Holder Name"
                      name="holder_name"
                      rules={[{ required: true, message: 'Please enter card holder name' }]}
                  >
                      <Input maxLength={50} />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                      label="Card Number"
                      name="card_number"
                      rules={[{ required: true, message: 'Please enter card number' }]}
                  >
                      <Input maxLength={16} />
                  </Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Item
                      label="Expiration Month"
                      name="exp_month"
                      rules={[{ required: true, message: 'Please enter expiration month' }]}
                  >
                      <Input maxLength={2} />
                  </Item>
                </Col>
                <Col span={12}>
                  <Item
                      label="Expiration Year"
                      name="exp_year"
                      rules={[{ required: true, message: 'Please enter expiration year' }]}
                  >
                      <Input maxLength={2} />
                  </Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Item
                      label="CVC"
                      name="cvc"
                      rules={[{ required: true, message: 'Please enter CVC' }]}
                  >
                      <Input maxLength={3} />
                  </Item>
                </Col>
              </Row>
              <Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
              </Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment;
