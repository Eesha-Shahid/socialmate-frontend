import { addInfluencerToList, getInfluencerList, getInfluencers, removeInfluencerFromList } from "@/redux/actions/influencerCampaignAction";
import { InfluencerCampaignSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Typography, type TableColumnsType, type TableProps } from 'antd';
import { Country, Gender, Industry } from "@/types";
import { getColor } from "@/colors";

const InfluencerCampaign:React.FC<IInfluencerCampaignProps> = () => {
  const dispatch = useAppDispatch();

  const { influencerList, influencers } = useSelector(InfluencerCampaignSelector);

  useEffect(()=> {
    dispatch(getInfluencers());
    dispatch(getInfluencerList());
  },[influencerList, influencers])

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    follower_count: number;
    location: string;
    industry: string[];
    gender: string;
  }

  const handleClick = (id: string) => {
    isInfluencerAdded(id)
    ? dispatch(removeInfluencerFromList({ influencer_id: id }))
    : dispatch(addInfluencerToList({ influencer_id: id }))
  }

  const isInfluencerAdded = (influencerId: any) => {
    return influencerList?.some(influencer => influencer._id === influencerId);
  };

  const tableData = influencers?.map((influencer, index) => ({
    key: influencer._id,
    name: influencer.name,
    age: influencer.demographics.age,
    industry: influencer.industry,
    gender: influencer.demographics.gender,
    follower_count: influencer.follower_count,
    location: influencer.demographics.location,
    contact: (
      <Button 
        type="primary"
      >
        {influencer.email}
      </Button>
    ),
    action: (
      <Button 
        type="primary"
        style={{ background: isInfluencerAdded(influencer._id)? getColor('red'): getColor('green')}}
        onClick={ () => handleClick(influencer._id)}
      >
        {isInfluencerAdded(influencer._id) ? 'Remove from list' : 'Add to list'}
      </Button>
    ),
  }));

  const columns: TableColumnsType<DataType> = [
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
      dataIndex: 'industry',
      filters: Object.values(Industry).map(industry => ({
        text: industry,
        value: industry,
      })),
      onFilter: (value, record) => record.industry.indexOf(value as string) === 0,
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

  return (
    <>
    <Typography.Title style={{ textAlign: 'center' }} className="gradient-text">
        Influencers
    </Typography.Title>
    <Table
      columns={columns}
      dataSource={tableData}
    />
    </>
  )
}

export default InfluencerCampaign;
