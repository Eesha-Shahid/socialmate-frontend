import React, { useEffect, useState } from "react";
import { Avatar, Space, Drawer, Typography, Divider, Row, Col, Select, Button,Image } from 'antd';
import type {SelectProps} from 'antd';
import { FacebookIcon, InstagramMediumIcon, RedditIcon } from "@/assets/icons";
import { Calendar as CalendarIcon, Clock } from "akar-icons";
import { IPostDetailsProps } from "./types";
import { ImageCarousel, TextWithGradientBorder } from 'components';
import { IUpdateScheduledPostData } from "@/redux/types/contentCalendar/reducer";
import { updateScheduledPost } from "@/redux/actions/contentCalendarAction";
import { useAppDispatch } from "@/redux/hooks";
import { getInfluencerList } from "@/redux/actions/influencerCampaignAction";
import { useSelector } from "react-redux";
import { InfluencerCampaignSelector } from "@/redux/reducers";
import { Country } from "@/types";
const { Title, Text } = Typography;

const PostDetails: React.FC<IPostDetailsProps> = ({ selectedPost, closeSidebar, sidebarVisible}) => {

  const dispatch = useAppDispatch();
  const { influencerList } = useSelector(InfluencerCampaignSelector);
  const [ hashtagList, setHashtagList] = useState<any>();
  const [ tagList, setTagList] = useState<any>();
  const [ location, setLocation] = useState<any>();
  const [modifiedPostData, setModifiedPostData] = useState<IUpdateScheduledPostData>({ _id: selectedPost._id });

  const handleTextChange = (fieldName: string, newText: string) => {
    setModifiedPostData(prevData => ({
      ...prevData,
      [fieldName]: newText,
    }));
  };

  useEffect(()=> {
    dispatch(getInfluencerList());
  },[influencerList])

  const saveChanges = () => {
    const updateData = {
      ...modifiedPostData,
      hashtags: hashtagList && hashtagList.length > 0 ? hashtagList: [],
      tagged_accounts: tagList && tagList.length > 0 ? tagList: [],
      location: location ? location: null
    }
    dispatch(updateScheduledPost(updateData));
  };
  
  const renderPlatforms = (platforms: string[]) => (
    <>
      {platforms.length > 0 &&
        <Space style={{ marginBottom: '1rem' }}>
          {platforms.includes('instagram') && <Avatar icon={<InstagramMediumIcon />} />}
          {platforms.includes('facebook') && <Avatar icon={<FacebookIcon />} />}
          {platforms.includes('reddit') && <Avatar icon={<RedditIcon />} />}
        </Space>
      }
      {
        platforms.length == 0 &&
        <Text>No Platforms</Text>
      }
    </>
  );
  
  const renderDetail = (type: string, text: string | undefined) => {
    const maxLength = type === 'caption' ? 100 : type === 'description' ? 200 : undefined;
    return (
      <TextWithGradientBorder 
        className={text ? "" : "text-mute"} 
        text={text || `No ${type}`}
        maxLength={maxLength}
        onTextChange={(newText) => handleTextChange(type, newText)}
        emoji={type === 'caption' || type === 'description'}
    />
    )
  };

  const renderDateTime = (scheduledTime: Date) => (
    <Space direction="horizontal">
      <CalendarIcon />
      <TextWithGradientBorder 
        editable={false}
        text={new Date(scheduledTime).toLocaleDateString()}
      />
      <Clock />
      <TextWithGradientBorder 
        editable={false}
        text={new Date(scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      />
    </Space>
  );
  
  const renderHashtags = () => {
    const handleHashtagChange = (value: string[]) => {
      setHashtagList(value)
    };

    const hashtagOptions: SelectProps['options'] = [];

    {selectedPost.hashtags?.map((hashtag,index) => (
      hashtagOptions.push({
        value: hashtag,
        label: hashtag,
      })
    ))}

    return(
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Add Hashtags"
        tokenSeparators={[',']}
        defaultValue={selectedPost.hashtags}
        onChange={handleHashtagChange}
        maxTagCount="responsive"
        options={hashtagOptions}
      />
    )
  }

  const renderTaggedAccounts = () => {
    const handleTagChange = (value: string[]) => {
      setTagList(value)
    };

    const tagOptions: SelectProps['options'] = [];

    {influencerList?.map(influencer => (
      tagOptions.push({
        value: influencer.name,
        label: influencer.name,
      })
    ))}
    
    return(
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Add Accounts"
        tokenSeparators={[',']}
        defaultValue={selectedPost.tagged_accounts}
        maxTagCount="responsive"
        onChange={handleTagChange}
        options={tagOptions}
      />
    )
  }

  const renderLocation = () => {
    const handleLocationChange = (value: string) => {
      setLocation(value)
    };

    const locationOptions: SelectProps['options'] = [];

    {Object.values(Country)?.map(country => (
      locationOptions.push({
        value: country,
        label: country
      })
    ))}
  
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Add Location"
        defaultValue={selectedPost.location}
        onChange={handleLocationChange}
        options={locationOptions}
      />
    )
  }

  return (
    <Drawer
      width={600}
      placement="right"
      closable={true}
      onClose={closeSidebar}
      open={sidebarVisible}
      title={
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Title level={4} className="gradient-text" style={{ textAlign: 'center', marginBottom: '26.6px' }}>Post Details</Title>
          </Col>
          <Col span={4}>
            <Button type="primary" size="small" onClick={() => saveChanges()}>Save</Button>
          </Col>
        </Row>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {selectedPost && (
          <div style={{ padding: '1rem' }}>
            <ImageCarousel media={selectedPost.media}/>
            {/* <div className="gallery">
              {
                selectedPost.media.map((url: string, index: number) => (
                  <figure key={index} className="image-card">
                    <Image src={url} alt={`Media ${index + 1}`} />
                  </figure>
                ))
              }
            </div> */}
            <Divider />
            <Title level={4}>Platforms</Title>
            {renderPlatforms(selectedPost.platform)}
            <Divider />
            <Title level={4}>Caption</Title>
            {renderDetail("caption", selectedPost.caption)}
            <Divider />
            <Title level={4}>Description</Title>
            {renderDetail("description", selectedPost.description)}
            <Divider />
            <Title level={4}>Date and Time</Title>
            {renderDateTime(selectedPost.scheduled_time)}
            <Divider />
            <Title level={4}>Hashtags</Title>
            {renderHashtags()}
            <Divider />
            <Title level={4}>Location</Title>
            {renderLocation()}
            <Title level={4}>Tagged</Title>
            {renderTaggedAccounts()}
          </div>
        )}
      </Space>
    </Drawer>
  );
};

export default PostDetails;
