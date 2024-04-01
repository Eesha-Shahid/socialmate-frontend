import { paymentMethodColumns } from "@/components/tableColumn/paymentMethod";
import { getPaymentMethods, getSubscriptionHistry } from "@/redux/actions/subscriptionAction";
import { SubscriptionSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { Table } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Subscriptions = () => {

  const dispatch = useAppDispatch();
  const { paymentMethods, subscriptionHistory } = useSelector(SubscriptionSelector);

  useEffect(() => {
    dispatch(getSubscriptionHistry());
    dispatch(getPaymentMethods());
  }, []);
  
  const data: DataType[] = [
    {
      key: '1',
      holder_name: 'John Brown',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'default'
    },
    {
      key: '2',
      holder_name: 'Jim Green',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'set default'
    },
    {
      key: '3',
      holder_name: 'Joe Black',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'set default'
    },
    {
      key: '4',
      holder_name: 'Joe Black',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'set default'
    },
    {
      key: '5',
      holder_name: 'Joe Black',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'set default'
    },
    {
      key: '6',
      holder_name: 'Joe Black',
      card_number: '1234 1234 1234 1234',
      expiry: '9/27',
      cvv: '123',
      status: 'set default'
    },
  ];

  const actualData = paymentMethods?.map(({ exp_month, exp_year, ...rest }, index) => ({
    ...rest,
    expiry: `${exp_month}/${exp_year}`,
    key: String(index + 1)
  }));
  
  return (
    <Table columns={paymentMethodColumns} dataSource={data} pagination={{ position: ['bottomCenter']}}/>
    );
};

export default Subscriptions;
