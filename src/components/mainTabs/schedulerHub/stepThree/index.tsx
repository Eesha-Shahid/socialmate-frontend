import { TextWithGradientBorder } from "components"
import { Row, Col, Typography, Carousel, Space } from "antd"
import { useSelector } from "react-redux";
import { SubscriptionSelector } from "@/redux/reducers";
import ReactCreditCards from "react-credit-cards-2";
import { useEffect, useState } from "react";
import { addPaymentMethod, getPaymentMethods } from "@/redux/actions/subscriptionAction";
import { useAppDispatch } from "@/redux/store";
import { Plus } from "akar-icons";

const {Text} = Typography;

const StepThree = () => {
  const dispatch = useAppDispatch();
  const { paymentMethods } = useSelector(SubscriptionSelector);
  const [ selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [ addCardDto, setAddCardDto ] = useState({
    holder_name: '',
    card_number: '',
    expiration_date: '',
    cvc: '',
  });

  const borderColor = "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)"
  
  const handleTextChange = (fieldName: string, newText: string) => {
    setAddCardDto((prevDto) => ({
      ...(prevDto || {}),
      [fieldName]: newText,
    }));
  };  

  const handleAddPaymentMethod = () => {
    const { expiration_date, ...rest } = addCardDto || {};
    const [expMonth, expYear] = (expiration_date || '').split('/');
  
    dispatch(
      addPaymentMethod({
        ...rest,
        exp_month: expMonth?.trim(),
        exp_year: expYear?.trim(),
      })
    );
  };

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [paymentMethods]);
  
  return (
    <>
      <Row justify="center" gutter={16} style={{ marginBottom: '3rem' }}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '400' }}>
          Select Your Payment Method
          </Text>
        </Col>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: '1rem'}}>
          Choose, Switch, or Add?
          </Text>
        </Col>
      </Row>
      <Row justify="center" gutter={16}>
        <Col span={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Col span={24}>
              <Text strong>Card Number</Text>
            </Col>
            <Col span={24}>
              <TextWithGradientBorder 
                maxLength={16}
                placeholder="E.g. 1234 1234 1234 1234"
                onTextChange={(newText) => handleTextChange('card_number', newText)}
              />
            </Col>
            <Col span={24}>
              <Text strong>Card Holder</Text>
            </Col>
            <Col span={24}>
              <TextWithGradientBorder 
                placeholder="Enter full name"
                onTextChange={(newText) => handleTextChange('holder_name', newText)}
              />
            </Col>
            <Row justify='space-between' gutter={16} style={{ margin: '0.2rem 0px' }}>
              <Col span={10}>
                <Text strong>Expiration Date</Text>
                <TextWithGradientBorder 
                  maxLength={5}
                  placeholder="MM / YY"
                  onTextChange={(newText) => handleTextChange('expiration_date', newText)}
                />
              </Col>
              <Col span={10}>
                <Text strong>CVV:</Text>
                <TextWithGradientBorder 
                  maxLength={3}
                  placeholder="E.g. 123"
                  onTextChange={(newText) => handleTextChange('cvc', newText)}
                />
              </Col>
            </Row>
            <Col span={24}>
              <div 
                style={{ cursor: 'pointer', background: borderColor, borderRadius: '20px', marginTop: '1rem', height: 'auto' }}
                className="outer-gradient-border"
                onClick={() => handleAddPaymentMethod()}
              >
                <div 
                  style={{ background: '#F3F4F6', padding: '30px 30px', borderRadius: '18px', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                  className='inner-text'
                >
                  <Plus color="#AEA8A8" />
                </div>
              </div>
            </Col>
          </Space>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Carousel style={{ width: 400 }} arrows infinite={false} beforeChange={(prev, next) => setSelectedCardIndex(next)}>
            {paymentMethods?.map((card, index) => (
              <div key={index}>
                <ReactCreditCards
                  name={card.holder_name}
                  number={card.card_number}
                  expiry={`${card.exp_month}/${card.exp_year}`}
                  cvc={card.cvc}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  )
}

export default StepThree