import { FacebookIcon, InstagramIcon, RedditIcon } from '@/assets/icons';
import { AssistantButton, TextWithGradientBorder, AiAssistant} from 'components';
import Icon, {UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, DatePicker, DatePickerProps, Divider, Image, Input, Row, Select, SelectProps, Space, Tag, TimePicker, TimePickerProps, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { InfluencerCampaignSelector, SchedulerHubSelector } from '@/redux/reducers';
import { useSelector } from 'react-redux';
import { getInfluencerList } from '@/redux/actions/influencerCampaignAction';
import { useAppDispatch } from '@/redux/store';
import { Calendar, Clock } from 'akar-icons';
import dayjs from 'dayjs';
import { MediaType, NotificationType, Platform } from '@/types';
import { createPost, createScheduledPost } from '@/redux/actions/contentCalendarAction';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstace';
import { getColor } from '@/colors';
import { getSubreddits } from '@/redux/actions/schedulerHubAction';
import TextArea from 'antd/es/input/TextArea';
import { updateAlert } from '@/redux/actions/alertAction';
import { IFlair } from '@/redux/types/schedulerHub/reducer';
import moment from 'moment';
const { Text } = Typography;

interface StepOneProps {
  setCaptionPreview: (caption: string) => void;
  setDescriptionPreview: (description: string) => void;
  setFilePreview: (file: File | null) => void;
  setHashtagPreview: (hashtagList: string) => void;
  setFlairPreview: (flairList: string) => void;
  setSubredditPreview: (subredditList: string) => void;
}

const StepOne:React.FC<StepOneProps> = ({ setCaptionPreview, setDescriptionPreview, setFilePreview, setHashtagPreview, setSubredditPreview, setFlairPreview }) => {
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { influencerList } = useSelector(InfluencerCampaignSelector);
  const { subreddits } = useSelector(SchedulerHubSelector);
  const [ hashtagList, setHashtagList] = useState<any>();
  const [ tagList, setTagList] = useState<any>();
  const [ subreddit, setSubreddit] = useState<any>();
  const [selectedSubreddit, setSelectedSubreddit] = useState<any>();
  const [ flair, setFlair] = useState<any>();
  const [ timeString, setTimeString] = useState<any>();
  const [ dateString, setDateString] = useState<any>();
  const [ sentiment, setSentiment ] = useState<any>('None');
  const [ sentimentLoading, setSentimentLoading ] = useState(false);
  const [ descriptionSentiment, setDescriptionSentiment ] = useState<any>('None');
  const [ descriptionSentimentLoading, setDescriptionSentimentLoading ] = useState(false);
  const [ captionFromImage, setCaptionFromImage ] = useState<any>('None');
  const [ captionFromImageLoading, setCaptionFromImageLoading ] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [ suggestedCaption, setSuggestedCaption ] = useState<any>();
  const router = useRouter();

  const [ createScheduledPostDto, setCreateScheduledPostDto ] = useState({
    caption: '',
    description: '',
    scheduled_time: [],
  });

  useEffect(()=> {
  },[suggestedCaption])

  useEffect(()=> {
    dispatch(getInfluencerList());
    dispatch(getSubreddits())
  },[])
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSchedule = () => {

    // Including platforms
    let platform = [];
    if (selectedAvatars.includes(1)) {
      platform.push(Platform.Facebook)
    }
    if (selectedAvatars.includes(2)) {
      platform.push(Platform.Instagram)
    }
    if (selectedAvatars.includes(3)) {
      platform.push(Platform.Reddit)
    }

    // Formatiing date and time
    const dateTime = moment(dateString).set({
      hour: timeString.hour(),
      minute: timeString.minute(),
      second: timeString.second(),
    });

    const scheduled_post = {
      ...createScheduledPostDto,
      caption: createScheduledPostDto.caption ? createScheduledPostDto.caption : null,
      description: createScheduledPostDto.description ? createScheduledPostDto.description : null,
      media_type: file ? MediaType.Text : MediaType.Image,
      hashtags: hashtagList && hashtagList.length > 0 ? hashtagList: [],
      tagged_accounts: tagList && tagList.length > 0 ? tagList: [],
      subreddit: subreddit,
      flair_id: flair && flair._id ? flair._id : null,
      flair_text: flair && flair.text ? flair.text : null,
      scheduled_time: new Date(dateTime.toISOString()),
      platform: platform,
      file: file ? file : null,
    }

    dispatch(createScheduledPost(scheduled_post))
    router.push('/auth');
  }

  const handlePost = () => { 

    // Including platforms
    let platform = [];
    if (selectedAvatars.includes(1)) {
      platform.push(Platform.Facebook)
    }
    if (selectedAvatars.includes(2)) {
      platform.push(Platform.Instagram)
    }
    if (selectedAvatars.includes(3)) {
      platform.push(Platform.Reddit)
    }

    const new_post = {
      ...createScheduledPostDto,
      caption: createScheduledPostDto.caption ? createScheduledPostDto.caption : null,
      description: createScheduledPostDto.description ? createScheduledPostDto.description : null,
      media_type: file ? MediaType.Text : MediaType.Image,
      hashtags: hashtagList && hashtagList.length > 0 ? hashtagList: [],
      tagged_accounts: tagList && tagList.length > 0 ? tagList: [],
      subreddit: subreddit,
      flair_id: flair && flair._id ? flair._id : null,
      flair_text: flair && flair.text ? flair.text : null,
      scheduled_time: new Date(Date.now()),
      platform: platform,
      file: file ? file : null,
    }

    dispatch(createPost(new_post))
    router.push('/auth');
    dispatch(updateAlert({ type: NotificationType.Info, message: 'Your post will be uploaded shortly.' }))
  }

  const handleTextChange = (fieldName: string, newText: string) => {
    setCreateScheduledPostDto((prevDto) => ({
      ...(prevDto || {}),
      [fieldName]: newText,
    }));
    if (fieldName == 'caption') setCaptionPreview(newText);
    if (fieldName == 'description') setDescriptionPreview(newText);
     if (fieldName == 'caption') setSentiment('None')
     if (fieldName == 'description') setDescriptionSentiment('None')
  };  

  const handleSelectSuggestion = (selectedSuggestion: string) => {
    setCreateScheduledPostDto((prevDto) => ({
      ...(prevDto || {}),
      caption: selectedSuggestion,
    }));
    setSuggestedCaption(selectedSuggestion)
  };

  const renderMedia = () => {

    const handleChange = (e: any) => {
      setFile(e.target.files[0]);
      setFilePreview(e.target.files[0]);
    }

    const generateCaptionFromImage = async() => {
      try {
        const formData = new FormData();
        if (file){
          formData.append('file', file); 
        }
        setCaptionFromImageLoading(true)
        const response = await axiosInstance.post(`/user/generate-caption-from-image`, formData);
        setCaptionFromImageLoading(false)
        setCaptionFromImage(response.data.caption)
      } catch (err: any) {
        setCaptionFromImage('Error')
      }
    }

    return (
      <>
        <input type="file" onChange={handleChange} />
        {file && (
          <>
            <Image alt='Image' src={URL.createObjectURL(file)} />
            <Col style={{ display: 'flex',justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
              <Button type='primary' loading={captionFromImageLoading} onClick={generateCaptionFromImage}>Generate Caption</Button>
            </Col>
            <Col>
              <Text style={{ fontWeight: '500', marginBottom: '2rem' }}>Caption:</Text>
              <TextArea value={captionFromImage}/>
            </Col>
          </>
        )}
      </>
    );
  };

  const renderAvatarGroup = () => {
    
    const handleAvatarClick = (index: number) => {
      setSelectedAvatars((prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((item) => item !== index)
          : [...prevSelected, index]
      );
    }
    
    const renderAvatar = (index: number, icon: any ) => {

      const isSelected = selectedAvatars.includes(index);
      const avatarStyle = isSelected
        ? { border: "5px solid white", cursor: "pointer" }
        : { filter: "grayscale(100%)", border: "5px solid white", cursor: "pointer" };
  
      const iconStyle = isSelected
      ? {}
      : { filter: "grayscale(100%)" }
  
      const background = isSelected
      ? "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)"
      : "grey"
  
      return (
      <div 
        onClick={() => handleAvatarClick(index)}
        style={{ position: "relative", display: "inline-block", margin: '0 10px' }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
        <div
          style={{
            padding: "0.1rem",
            borderRadius: "50%",
            overflow: "hidden",
            background: background,
            border: "0.5px solid transparent",
            transition: "all 0.3s",
          }}
        >
          <div style={{ borderRadius: "50%", overflow: "hidden" }}>
            <Avatar
              src="https://i.pinimg.com/564x/18/9c/03/189c038c25664bb3b2ad077b6e58b1e3.jpg"
              style={{ ...avatarStyle, transition: "filter 0.3s" }}
              size={80}
              icon={<UserOutlined />}
            />
          </div>
        </div>
        <div style={{ position: "absolute", bottom: '-10px', right: 0 }}>
          <Icon style={iconStyle} component={icon} />
        </div>
      </div>
      )
    }

    return (
      <Col>
        <Avatar.Group size="large">
          {/* {renderAvatar(1, FacebookIcon)} */}
          {renderAvatar(2, InstagramIcon)}
          {renderAvatar(3, RedditIcon)}
        </Avatar.Group>
      </Col>
    )
  }

  const renderCaption = () => {
    const handleCalculateSentiment = async() => {
      try {
        setSentimentLoading(true)
        const response = await axiosInstance.post(`/user/calculate-sentiment`, { caption: createScheduledPostDto.caption });
        setSentimentLoading(false)
        setSentiment(response.data.sentiment)
      } catch (err: any) {
        setSentiment('Error')
      }
    }

    return (
      <>
        <Col span={24}>
          <Text strong>Caption:</Text>
          <AssistantButton loading={false} onClick={toggleSidebar}/>
        </Col>
        <Col span={24}>
          <TextWithGradientBorder 
            placeholder="Start Writing"
            maxLength={100}
            text={suggestedCaption}
            onTextChange={(newText) => handleTextChange('caption', newText)}
            emoji={true}
        />
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center' }} span={24}>
          <Button type='primary' loading={sentimentLoading} style={{ marginRight: '1rem' }} onClick={handleCalculateSentiment}>Calculate Sentiment</Button>
          <Tag color={sentiment == 'Positive' ? getColor('green'): sentiment == 'Negative' ? getColor('red') : getColor('lightGrey')} style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>{sentiment}</Tag>
        </Col>
      </>
    )
  }

  const renderDescription = () => {

    const handleCalculateSentiment = async() => {
      try {
        setDescriptionSentimentLoading(true)
        const response = await axiosInstance.post(`/user/calculate-sentiment`, { caption: createScheduledPostDto.description });
        setDescriptionSentimentLoading(false)
        setDescriptionSentiment(response.data.sentiment)
      } catch (err: any) {
        setDescriptionSentiment('Error')
      }
    }

    return (
      <>
        <Col span={24}>
          <Text strong>Description:</Text>
          {/* <AssistantButton loading={false} onClick={toggleSidebar}/> */}
        </Col>
        <Col span={24}>
          <TextWithGradientBorder 
          placeholder="Start Writing"
          maxLength={200}
          onTextChange={(newText) => handleTextChange('description', newText)}
          emoji={true}
        />
        </Col>
        <Col style={{ display: 'flex', alignItems: 'center' }} span={24}>
          <Button type='primary' loading={descriptionSentimentLoading}  style={{ marginRight: '1rem' }} onClick={handleCalculateSentiment}>Calculate Sentiment</Button>
          <Tag color={descriptionSentiment == 'Positive' ? getColor('green'): descriptionSentiment == 'Negative' ? getColor('red') : getColor('lightGrey')} style={{ fontSize: '1rem', padding: '0.5rem 1.5rem' }}>{descriptionSentiment}</Tag>
        </Col>
      </>
    )
  }

  const renderHashtags = () => {
    const handleHashtagChange = (value: string) => {
      setHashtagList(value)
      setHashtagPreview(value)
    };

    return (
      <>
      <Col span={24}>
        <Text strong>Hashtags:</Text>
      </Col>
      <Col span={24}>
        <Select
          mode="tags"
          variant="borderless"
          style={{ width: '100%' }}
          placeholder="Add Hashtags"
          tokenSeparators={[',']}
          onChange={handleHashtagChange}
          maxTagCount="responsive"
      />
      </Col>
    </>
    )
  }

  const renderSubredditsAndFlairs = () => {

    const handleSubredditChange = (value: string) => {
      setSubreddit(value)
      setSubredditPreview(value)
      setSelectedSubreddit(subreddits?.find(subreddit => subreddit.name === value))
    };

    const handleFlairChange = (value: string) => {
      const selectedFlair = selectedSubreddit.flairs.find((flair: IFlair) => flair.text === value);
      setFlair({ _id: selectedFlair.id, text: selectedFlair.text });
      setFlairPreview(selectedFlair.text);
    };

    const subredditOptions: SelectProps['options'] = subreddits?.map(subreddit => ({
      value: subreddit.name,
      label: subreddit.name,
    })) || [];
    
    const flairOptions: SelectProps['options'] = selectedSubreddit?.flairs?.map((flair: IFlair) => ({
      value: flair.text,
      label: flair.text,
    })) || [];

    return (
      <>
        <Col span={24}>
          <Text strong>Tag Community:</Text>
        </Col>
        <Col span={24}>
            <Select
              variant="borderless"
              style={{ width: '100%' }}
              placeholder="Add Community"
              onChange={handleSubredditChange}
              options={subredditOptions}
            />
        </Col>
        <Col span={24}>
          <Text strong>Tag Flair:</Text>
        </Col>
        <Col span={24}>
            <Select
              variant="borderless"
              style={{ width: '100%' }}
              placeholder="Add Flair"
              onChange={handleFlairChange}
              options={flairOptions}
            />
        </Col>
      </>
    )
  }

  const renderDate = () => {
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
      setDateString(date)
    };

    return (
      <Col span={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Calendar style={{ marginRight: '1rem' }}/>
        <DatePicker
          format='YYYY-MM-DD'
          onChange={onDateChange}
        />
      </Col>
    )
  }

  const renderTime = () => {
    const onTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
      setTimeString(time)
    };

    return (
      <Col span={5} style={{ display: 'flex', alignItems: 'center' }}>
        <Clock style={{ marginRight: '1rem' }}/>
        <TimePicker 
          format="HH:mm"
          onChange={onTimeChange} 
        />
      </Col>
    )
  }

  const renderScheduleTime = () => {
    return(
      <>
        <Col span={24}>
          <Text strong>Time:</Text>
        </Col>
        <Row>
          {renderDate()}
          {renderTime()}
        </Row>
      </>
    )
  }

  const renderTaggedAccounts = () => {
    const handleTagChange = (value: string) => {
      setTagList(value)
    };

    const tagOptions: SelectProps['options'] = [];

    {influencerList?.map(influencer => (
      tagOptions.push({
        value: influencer.username,
        label: influencer.username,
      })
    ))}
  

    return (
      <>
        <Col span={24}>
          <Text strong>Tag People:</Text>
        </Col>
        <Col span={24}>
            <Select
              mode="multiple"
              variant="borderless"
              style={{ width: '100%' }}
              placeholder="Add Influencers"
              onChange={handleTagChange}
              options={tagOptions}
              maxCount={3}
            />
        </Col>
      </>
    )
  }

  return (
    <>
      <Row justify="center" gutter={16} style={{ marginBottom: '3rem' }}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '400' }}>
          Create your Post
          </Text>
        </Col>
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: '1rem'}}>
           Write some compelling content
          </Text>
        </Col>
      </Row>
      {/* Avatar Container */}
      <Row justify="center" align="middle" style={{ height: '7rem', marginBottom: '3rem' }}>
        {renderAvatarGroup()}
      </Row>

      {/* Two Column Layout */}
      <Row justify="center" gutter={16}>
        <Col xs={24} md={6}>
          {/* <ImageCarousel media={media}/> */}
          {renderMedia()}
        </Col>
        <Col xs={24} md={18}>
          <Space size='middle' direction='vertical' style={{ width: '100%' }}>
            <Divider>Overall</Divider>
            {renderCaption()}
            {renderScheduleTime()}
            <Divider>For Reddit</Divider>
            {renderDescription()}
            {renderSubredditsAndFlairs()}
            <Divider>For Instagram</Divider>
            {renderHashtags()}
            {renderTaggedAccounts()}
            <Col span={4}>
              <Button type='primary' onClick={handlePost}>Post</Button>
            </Col>
            <Col span={4}>
              <Button type='primary' onClick={handleSchedule}>Schedule</Button>
            </Col>
          </Space>
        </Col>
      </Row>
      <AiAssistant onClose={toggleSidebar} visible={sidebarVisible} onSelect={handleSelectSuggestion}/>
    </>
  ) 
}

export default StepOne;
