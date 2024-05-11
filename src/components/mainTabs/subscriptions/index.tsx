import { getColor } from "@/colors";
import { getPaymentMethods, getSubscriptionHistry, setDefaultPaymentMethod } from "@/redux/actions/subscriptionAction";
import { SubscriptionSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { SubscriptionStatus } from "@/types";
import { Button, Carousel, Col, Row, Table, Tag, Typography } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactCreditCards from "react-credit-cards-2";
import { useSelector } from "react-redux";
const { Title } = Typography;

const Subscriptions = () => {
  const dispatch = useAppDispatch();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const { paymentMethods, subscriptionHistory } = useSelector(SubscriptionSelector);

  useEffect(() => {
    dispatch(getSubscriptionHistry());
    dispatch(getPaymentMethods());
  }, [paymentMethods, subscriptionHistory]);

  const handleSetDefault = (cardId: string) => {
    dispatch(setDefaultPaymentMethod({ cardId }));
  }

  const actualPaymentMethod = paymentMethods?.map(({ default: isDefault, exp_month, exp_year, ...rest }, index) => ({
    ...rest,
    expiry: `${exp_month}/${exp_year}`,
    key: String(index + 1),
    action: isDefault ? 'Default' : 'Set Default'
  }));

  const actualSubscriptionHistory = subscriptionHistory?.map(({ ...rest }, index) => ({
    ...rest,
    key: String(index + 1)
  }));

  const paymentCol = [
    {
      title: 'Holder Name',
      dataIndex: 'holder_name',
      key: '1',
    },
    {
      title: 'Card Number',
      dataIndex: 'card_number',
      key: '2',
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      key: '3',
    },
    {
      title: 'cvc',
      dataIndex: 'cvc',
      key: '4',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: '5',
      render: (action: string, record: any) => {
        return action === 'Default' ? <Tag color="green">Default</Tag> : <Button type="default" onClick={() => handleSetDefault(record._id)}>Set Default</Button>;
      }
    }
  ];
  
  const subscriptionCol = [
    {
      title: 'Holder Name',
      dataIndex: 'holder_name',
      key: '1',
    },
    {
      title: 'Card Number',
      dataIndex: 'card_number',
      key: '2',
    },
    {
      title: 'Expiry',
      dataIndex: 'expiration_date',
      key: '3',
      render: (expiration_date: any) => moment(expiration_date).format('D MMM YYYY, h:mm:ss A')
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '4',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '5',
      render: (status: SubscriptionStatus) => (
        <Tag color={status == 'Active' ? getColor('green') : getColor('red')} key={status}>
          {status.toUpperCase()}
        </Tag>
      )
    }
  ];
  
  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <Title className="gradient-text">Your Payment Methods</Title>
        <Table dataSource={actualPaymentMethod} columns={paymentCol} />
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} span={6}>
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
      <Col span={24}>
        <Title className="gradient-text">Your Subscription History</Title>
        <Table dataSource={actualSubscriptionHistory} columns={subscriptionCol} />
      </Col>
    </Row>
    );
};

export default Subscriptions;
