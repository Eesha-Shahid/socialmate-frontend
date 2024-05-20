import { DeleteFilled } from "@ant-design/icons";
import { TableProps, Tag, Space } from "antd";

export const paymentMethodColumns: TableProps<PaymentDataType>["columns"] = [
  {
    title: "Holder Name",
    dataIndex: "holder_name",
    key: 0,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Card Number",
    dataIndex: "card_number",
    key: 1,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    key: 2,
  },
  {
    title: "Status",
    key: 3,
    dataIndex: "status",
    render: (_, { status }) => {
      let color = status.length > 5 ? "geekblue" : "green";
      if (status === "loser") {
        color = "volcano";
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: 4,
    render: (_, record) => (
      <Space size="middle">
        <DeleteFilled />
      </Space>
    ),
  },
];
