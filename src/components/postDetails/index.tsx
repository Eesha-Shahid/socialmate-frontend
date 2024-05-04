import React from "react";
import { Avatar, Calendar, Space, Drawer, Typography, Divider, Carousel, Image } from 'antd';
import { FacebookIcon, InstagramMediumIcon, RedditIcon } from "@/assets/icons";
import TextWithGradientBorder from "@/components/textWithGradientBorder";
import { Calendar as CalendarIcon, Clock } from "akar-icons";
import { IPostDetailsProps } from "./types";
import ImageCarousel from "../imageCarousel";
const { Title } = Typography;

const PostDetails: React.FC<IPostDetailsProps> = ({ selectedPost, closeSidebar, sidebarVisible}) => {
  
  const renderPlatforms = (platforms: string[]) => (
    <Space style={{ marginBottom: '1rem' }}>
      {platforms.includes('instagram') && <Avatar icon={<InstagramMediumIcon />} />}
      {platforms.includes('facebook') && <Avatar icon={<FacebookIcon />} />}
      {platforms.includes('reddit') && <Avatar icon={<RedditIcon />} />}
    </Space>
  );
  
  const renderDetail = (type: string, text: string | undefined) => (
    <TextWithGradientBorder 
      className={text ? "" : "text-mute"} 
      text={text || `No ${type}`}
    />
  );

  const renderDateTime = (scheduledTime: Date) => (
    <Space direction="horizontal">
      <CalendarIcon />
      <TextWithGradientBorder 
        size="small"
        text={new Date(scheduledTime).toLocaleDateString()}
      />
      <Clock />
      <TextWithGradientBorder 
        size="small"
        text={new Date(scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      />
    </Space>
  );
  
  const renderHashtags = (hashtags: string[] | undefined) => (
    <Space>
      {hashtags?.map((tag: string, index: number) => (
        <React.Fragment key={index}>
          <TextWithGradientBorder 
            size="small"
            text={`#${tag}`}
            gradientText={true}
            className={tag ? '' : 'text-mute'}
          />
        </React.Fragment>
      ))}
    </Space>
  );

  return (
    <div>
      <Drawer
        width={600}
        placement="right"
        closable={true}
        onClose={closeSidebar}
        visible={sidebarVisible}
      >
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
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default PostDetails;
