import { useState, useEffect } from 'react';
import { useAppDispatch } from "@/redux/store";
import { Select, Card, Typography, Col, Row } from 'antd';
import { InfluencerCampaignSelector, InstagramSummarySelector } from '@/redux/reducers';
import { getInfluencers } from '@/redux/actions/influencerCampaignAction';
import { IInfluencer } from '@/redux/types/influencerCampaign/reducer';
import { Industry } from '@/types';
import { useSelector } from 'react-redux';
import { getAccountDetailsSummary } from '@/redux/actions/instagramSummaryAction';

const { Title, Text } = Typography;

const InfluencerAnalysis: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const { influencers } = useSelector(InfluencerCampaignSelector);
  const { accountDetailsSummary } = useSelector(InstagramSummarySelector);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [filteredInfluencers, setFilteredInfluencers] = useState<IInfluencer[] | null>([]);

  useEffect(()=> {
    dispatch(getInfluencers());
    dispatch(getAccountDetailsSummary());
  },[]);

  useEffect(() => {
    if (selectedIndustry) {
      const filtered = influencers?.filter(influencer =>
        influencer.industry.includes(selectedIndustry as Industry)
      );
      setFilteredInfluencers(filtered as IInfluencer[]);
    } 
  }, [selectedIndustry, influencers]);

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };

  const renderTimePeriodStats = (label: string, value: number | null) => {
    return (
      <Col span={24} style={{ textAlign: "center" }}>
        <div className="gradient-text">{value || "Unknown"}</div>
        <div className="text-bold">{label}</div>
      </Col>
    );
  };

  return (
    <>
      <Select
        showSearch
        placeholder="Select industry"
        optionFilterProp="children"
        filterOption={filterOption}
        onChange={handleIndustryChange}
      >
        {Object.values(Industry).map((industry) => (
          <Option key={industry} value={industry}>
            {industry}
          </Option>
        ))}
      </Select>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredInfluencers?.map(influencer => (
          <Card
            key={influencer._id}
            style={{ width: 400, borderRadius: 16, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>{influencer.name}</Title>
            <Row gutter={[16, 16]}>
              {renderTimePeriodStats(
                "Total Followers",
                influencer.follower_count
              )}
              {accountDetailsSummary && accountDetailsSummary.followers_count && renderTimePeriodStats(
                "Your Followers",
                accountDetailsSummary.followers_count
              )}
              {accountDetailsSummary && accountDetailsSummary.followers_count && renderTimePeriodStats(
                "Follower Difference",
                influencer.follower_count - accountDetailsSummary.followers_count
              )}      
            </Row>
          </Card>
        ))}
      </div>
    </>
  );
}

export default InfluencerAnalysis;
