import { getAds } from '@/redux/actions/adCampaignAction';
import { AdCampaignSelector } from '@/redux/reducers/adCampaignReducer';
import { useAppDispatch } from '@/redux/store';
import { Table, Typography } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AdColumns } from '../tableColumn/ads';

const Ads:React.FC<IInfluencerCampaignProps> = () => {
  const dispatch = useAppDispatch();
  const { ads }= useSelector(AdCampaignSelector);

  useEffect(() => {
    dispatch(getAds());
  }, [ads])

  const tableData = ads?.map((ads, index) => ({
    key: ads._id,
    ad_name: ads.ad_name,
    ad_copy: ads.ad_copy,
    age: ads.targeting_criteria.age,
    location: ads.targeting_criteria.location,
    interests: ads.targeting_criteria.interests,
    ad_spend: ads.performance_metrics.ad_spend,
    revenue_generated: ads.performance_metrics.revenue_generated,
    engagement_rate: ads.performance_metrics.engagement_rate,
    impressions: ads.performance_metrics.impressions,
    clicks: ads.performance_metrics.clicks,
    ctr: ads.performance_metrics.ctr,
    date: ads.date
  }));

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }} className="gradient-text">
          Advertisements
      </Typography.Title>
      <Table
        columns={AdColumns}
        dataSource={tableData}
      />
    </>
  )
}

export default Ads;
