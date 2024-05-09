import React, { useEffect, useState } from "react";
import { Avatar, Badge, Calendar, Space, Image, Row } from 'antd';
import { FacebookIcon, InstagramMediumIcon, RedditIcon } from "@/assets/icons";
import { Dayjs } from "dayjs";
import { useAppDispatch } from "@/redux/store";
import { getScheduledPosts } from "@/redux/actions/contentCalendarAction";
import { useSelector } from "react-redux";
import { ContentCalendarSelector } from "@/redux/reducers";
import {PostDetails, TextWithGradientBorder} from "components";
import { renderTime } from "@/utils";
import { Clock } from "akar-icons";

const ContentCalendar = () => {
  const dispatch = useAppDispatch();
  const { scheduledPosts } = useSelector(ContentCalendarSelector);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    dispatch(getScheduledPosts());
    if (!sidebarVisible) {
      setSelectedPost(null);
    }
  }, [scheduledPosts, sidebarVisible]);
  
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
            <Row align="middle">
              <Clock style={{ marginRight: '1rem' }}/>
              {renderTime(post.scheduled_time)}
            </Row>
            {post.caption || 'Scheduled post'}
            <Image style={{ borderRadius: '15px' }} preview={false} src={post.media[0]} alt="Image"/>
            <Space direction="vertical">
              {post.hashtags?.map((tag: string, index: number) => (
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
      <Calendar style={{ margin: '2rem', background: 'none' }} cellRender={dateCellRender} onPanelChange={onPanelChange} />
      {selectedPost && <PostDetails selectedPost={selectedPost} sidebarVisible={sidebarVisible} closeSidebar={closeSidebar} />}
    </div>
  );
};

export default ContentCalendar;
