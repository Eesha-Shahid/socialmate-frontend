import { addInfluencerToList, getInfluencerList, getInfluencers, removeInfluencerFromList } from "@/redux/actions/influencerCampaignAction";
import { InfluencerCampaignSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Typography } from 'antd';
import { getColor } from "@/colors";
import { InfluencerColumns } from "../tableColumn/influencers";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const InfluencerDiscovery:React.FC = () => {
  const dispatch = useAppDispatch();
  const { influencerList, influencers, influencersLoading } = useSelector(InfluencerCampaignSelector);

  useEffect(()=> {
    dispatch(getInfluencers());
    dispatch(getInfluencerList());
  },[])

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
      <>
        {isInfluencerAdded(influencer._id) ? 
          <HeartFilled style={{ color: getColor('red'), fontSize: '2rem' }}  onClick={() => handleClick(influencer._id)} />
          :
          <HeartOutlined style={{ fontSize: '2rem', strokeWidth: '1.5' }}  onClick={() => handleClick(influencer._id)} />
        }
      </>
    )
  }));

  return (
    <>
    <Typography.Title style={{ textAlign: 'center' }} className="gradient-text">
        Influencer Discovery
    </Typography.Title>
    <Table
      loading={influencersLoading}
      columns={InfluencerColumns}
      dataSource={tableData}
    />
    </>
  )
}

export default InfluencerDiscovery;
