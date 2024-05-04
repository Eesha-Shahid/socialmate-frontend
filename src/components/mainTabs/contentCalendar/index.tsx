import React, { useEffect, useState } from "react";
import { Avatar, Badge, Calendar, Space, Drawer, Typography, Divider, Carousel, Image } from 'antd';
import { FacebookIcon, InstagramMediumIcon, RedditIcon } from "@/assets/icons";
import { Dayjs } from "dayjs";
import { useAppDispatch } from "@/redux/store";
import { getScheduledPosts } from "@/redux/actions/contentCalendarAction";
import { useSelector } from "react-redux";
import { ContentCalendarSelector } from "@/redux/reducers";
import TextWithGradientBorder from "@/components/textWithGradientBorder";

import { Calendar as CalendarIcon, Clock } from "akar-icons";
import PostDetails from "@/components/postDetails";

const { Title, Text } = Typography;

const ContentCalendar = () => {
  const dispatch = useAppDispatch();
  const { scheduledPosts } = useSelector(ContentCalendarSelector);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    dispatch(getScheduledPosts());
  }, [scheduledPosts]);

  
  const onPanelChange = (value: Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const showSidebar = (post: any) => {
    setSelectedPost(post);
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const getListData = (value: any) => {
    const posts = scheduledPosts?.filter(post => {
      const scheduledDate = new Date(post.scheduled_time);
      return scheduledDate.getFullYear() === value.year() &&
            scheduledDate.getMonth() === value.month() &&
            scheduledDate.getDate() === value.date();
    });
  
    if (posts && posts.length > 0) {
      return posts.map(post => ({
        content: (
          <Space direction="vertical">
            {post.caption || 'Scheduled post'}
            <Avatar.Group>
              {post.platform.includes('instagram') && <Avatar icon={<InstagramMediumIcon />} />}
              {post.platform.includes('facebook') && <Avatar icon={<FacebookIcon />} />}
              {post.platform.includes('reddit') && <Avatar icon={<RedditIcon />} />}
            </Avatar.Group>
          </Space>
        ),
        onClick: () => showSidebar(post)
      }));
    }
  
    return [];
  };  

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            <Badge status={"success"} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Calendar style={{ margin: '2rem', background: 'none' }} dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
      <PostDetails selectedPost={selectedPost} sidebarVisible={sidebarVisible} closeSidebar={closeSidebar} />
    </div>
  );
};

export default ContentCalendar;
