import { addInfluencerToList, getInfluencerList, getInfluencers, removeInfluencerFromList } from "@/redux/actions/influencerCampaignAction";
import { InfluencerCampaignSelector } from "@/redux/reducers";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Typography } from 'antd';
import { getColor } from "@/colors";
import { InfluencerColumns } from "../tableColumn/influencers";

const Influencers:React.FC<IInfluencerCampaignProps> = () => {
  const dispatch = useAppDispatch();
  const { influencerList, influencers } = useSelector(InfluencerCampaignSelector);

  useEffect(()=> {
    dispatch(getInfluencers());
    dispatch(getInfluencerList());
  },[influencerList, influencers])

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

  return (
    <>
    <Typography.Title style={{ textAlign: 'center' }} className="gradient-text">
        Influencers
    </Typography.Title>
    <Table
      columns={InfluencerColumns}
      dataSource={tableData}
    />
    </>
  )
}

export default Influencers;
