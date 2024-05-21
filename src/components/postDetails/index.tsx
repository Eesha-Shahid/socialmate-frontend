import React, { useEffect, useState } from "react";
import { Avatar, Space, Drawer, Typography, Divider, Row, Col, Select, Button,Image, DatePicker, TimePicker } from 'antd';
import type {DatePickerProps, SelectProps, TimePickerProps} from 'antd';
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
import moment from "moment";
const { Title, Text } = Typography;

const PostDetails: React.FC<IPostDetailsProps> = ({ selectedPost, closeSidebar, sidebarVisible}) => {

  const dispatch = useAppDispatch();
  const { influencerList } = useSelector(InfluencerCampaignSelector);
  const [ hashtagList, setHashtagList] = useState<any>();
  const [ tagList, setTagList] = useState<any>();
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

  const renderDateTime = (scheduledTime: Date) => {
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
      // setDateString(date)
    };
    
    const onTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
      // setTimeString(time)
    };

    return (
      <Space direction="horizontal">
        <CalendarIcon/>
        <DatePicker
          // value={new Date(scheduledTime)}
          format='YYYY-MM-DD'
          onChange={onDateChange}
        />
        <Clock />
        <TimePicker 
            // value={moment(scheduledTime, "HH:mm:ss")}
            format="HH:mm"
            onChange={onTimeChange} 
          />
      </Space>
    )
  };
  
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
            <Title level={4}>Tagged</Title>
            {renderTaggedAccounts()}
          </div>
        )}
      </Space>
    </Drawer>
  );
};

export default PostDetails;
