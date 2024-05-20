import { TableColumnsType } from "antd";

export const AdColumns: TableColumnsType<AdDataType> = [
    {
      title: 'Name',
      dataIndex: 'ad_name',
    },
    {
      title: 'Caption',
      dataIndex: 'ad_copy',
    },
    {
      title: 'Interests',
      dataIndex: 'interests',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Spend',
      dataIndex: 'ad_spend',
      sorter: (a, b) => a.ad_spend - b.ad_spend,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue_generated',
      sorter: (a, b) => a.revenue_generated - b.revenue_generated,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Engagement',
      dataIndex: 'engagement_rate',
      sorter: (a, b) => a.engagement_rate - b.engagement_rate,
      sortDirections: ['descend', 'ascend'],
    },
  ];