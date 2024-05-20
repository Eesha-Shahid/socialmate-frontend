import { Country, Gender } from "@/types";
import { TableColumnsType, Tag } from "antd";

export const InfluencerColumns: TableColumnsType<InfluencerDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Followers',
    dataIndex: 'follower_count',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.follower_count - b.follower_count,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ['descend'],
  },
  {
    title: 'Industry',
    key: 'industry',
    dataIndex: 'industry',
    render: (_, { industry }) => (
      <>
        {industry.map((item) => {
          let color = item.length > 5 ? 'geekblue' : 'green';
          if (item === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={item}>
              {item.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: Object.values(Gender).map(gender => ({
      text: gender,
      value: gender,
    })),
    onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
  },
  {
    title: 'Location',
    dataIndex: 'location',
    filters: Object.values(Country).map(country => ({
      text: country,
      value: country,
    })),
    onFilter: (value, record) => record.location.indexOf(value as string) === 0,
  },
  {
    title: 'Contact',
    dataIndex: 'contact',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];