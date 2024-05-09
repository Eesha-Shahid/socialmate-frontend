import React, { useState } from "react";
import { Avatar, Space, Drawer, Typography, Divider, Carousel, Image, Button, Row, Col } from 'antd';
import { FacebookIcon, InstagramMediumIcon, RedditIcon } from "@/assets/icons";
import { Calendar as CalendarIcon, Clock } from "akar-icons";
import { IPostDetailsProps } from "./types";
import { ImageCarousel, TextWithGradientBorder } from 'components';
import { IUpdateScheduledPostData } from "@/redux/types/contentCalendar/reducer";
import { updateScheduledPost } from "@/redux/actions/contentCalendarAction";
import { useAppDispatch } from "@/redux/hooks";
const { Title } = Typography;

const PostDetails: React.FC<IPostDetailsProps> = ({ selectedPost, closeSidebar, sidebarVisible}) => {

  const dispatch = useAppDispatch();
  const [modifiedPostData, setModifiedPostData] = useState<IUpdateScheduledPostData>({ _id: selectedPost._id });

  const handleTextChange = (fieldName: string, newText: string) => {
    setModifiedPostData(prevData => ({
      ...prevData,
      [fieldName]: newText,
    }));
  };

  const saveChanges = () => {
    dispatch(updateScheduledPost(modifiedPostData));
  };
  
  const renderPlatforms = (platforms: string[]) => (
    <Space style={{ marginBottom: '1rem' }}>
      {platforms.includes('instagram') && <Avatar icon={<InstagramMediumIcon />} />}
      {platforms.includes('facebook') && <Avatar icon={<FacebookIcon />} />}
      {platforms.includes('reddit') && <Avatar icon={<RedditIcon />} />}
    </Space>
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
  
  const renderHashtags = (hashtags: string[] | undefined) => (
    <Space>
      {hashtags?.map((tag: string, index: number) => (
        <React.Fragment key={index}>
          <TextWithGradientBorder 
            editable={false}
            text={`#${tag}`}
            gradientText={true}
            className={tag ? '' : 'text-mute'}
          />
        </React.Fragment>
      ))}
    </Space>
  );

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
            {renderHashtags(selectedPost.hashtags)}
            <Divider />
            <Title level={4}>Location</Title>
            {renderDetail("location", selectedPost.location)}
            <Title level={4}>Tagged</Title>
            {renderHashtags(selectedPost.hashtags)}
          </div>
        )}
      </Space>
    </Drawer>
  );
};

export default PostDetails;
