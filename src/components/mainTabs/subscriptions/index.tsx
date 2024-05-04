import { getColor } from "@/colors";
import { getPaymentMethods, getSubscriptionHistry } from "@/redux/actions/subscriptionAction";
import { SubscriptionSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { SubscriptionStatus } from "@/types";
import { Button, Table, Tag, Typography } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const { Title } = Typography;

const Subscriptions = () => {

  const dispatch = useAppDispatch();
  const { paymentMethods, subscriptionHistory } = useSelector(SubscriptionSelector);

  useEffect(() => {
    dispatch(getSubscriptionHistry());
    dispatch(getPaymentMethods());
  }, []);

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
      render: (action: string) => <Button type={action === 'Default' ? 'primary' : 'default'}>{action}</Button>,
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
    <>
      <Title className="gradient-text">Your Payment Methods</Title>
      <Table dataSource={actualPaymentMethod} columns={paymentCol} />
      <Title className="gradient-text">Your Subscription History</Title>
      <Table dataSource={actualSubscriptionHistory} columns={subscriptionCol} />
    </>
    );
};

export default Subscriptions;
