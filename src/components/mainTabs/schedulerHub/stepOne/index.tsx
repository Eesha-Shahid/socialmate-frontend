import { FacebookIcon, InstagramIcon, RedditIcon } from '@/assets/icons';
import { AssistantButton, TextWithGradientBorder, AiAssistant} from 'components';
import Icon, {UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, DatePicker, DatePickerProps, Image, Input, Row, Select, SelectProps, Space, Tag, TimePicker, TimePickerProps, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { InfluencerCampaignSelector } from '@/redux/reducers';
import { useSelector } from 'react-redux';
import { getInfluencerList } from '@/redux/actions/influencerCampaignAction';
import { useAppDispatch } from '@/redux/store';
import { Calendar, Clock } from 'akar-icons';
import dayjs from 'dayjs';
import { Country, MediaType, NotificationType, Platform } from '@/types';
import { createPost, createScheduledPost } from '@/redux/actions/contentCalendarAction';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstace';
import { getColor } from '@/colors';
import { generateCaption } from '@/redux/actions/schedulerHubAction';
import TextArea from 'antd/es/input/TextArea';
import { updateAlert } from '@/redux/actions/alertAction';
const { Text, Title } = Typography;

const StepOne = () => {
  const [selectedAvatars, setSelectedAvatars] = useState<number[]>([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { influencerList } = useSelector(InfluencerCampaignSelector);
  const [ hashtagList, setHashtagList] = useState<any>();
  const [ tagList, setTagList] = useState<any>();
  const [ location, setLocation] = useState<any>();
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
    media_type: '',
    caption: '',
    description: '',
    location: '',
    hashtags: [],
    tagged_accounts: [],
    media: [],
    scheduled_time: [],
    platform: []
  });

  useEffect(()=> {
    dispatch(getInfluencerList());
  },[influencerList, suggestedCaption])

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
    
    // Formatting date and time
    // const date = dayjs(dateString).format('YYYY-MM-DD');;
    // const time = dayjs(timeString).format('HH:mm');
    // const [hours, minutes] = time.split(':');
    // const [year, month, day] = date.split('-');
    // const isoString = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)).toISOString();
    // console.log(isoString);

    const scheduled_post = {
      ...createScheduledPostDto,
      caption: createScheduledPostDto.caption ? createScheduledPostDto.caption : null,
      description: createScheduledPostDto.description ? createScheduledPostDto.description : null,
      media_type: (createScheduledPostDto.caption != '' || createScheduledPostDto.description != '') ? MediaType.Image : MediaType.Text,
      hashtags: hashtagList && hashtagList.length > 0 ? hashtagList: [],
      tagged_accounts: tagList && tagList.length > 0 ? tagList: [],
      scheduled_time: new Date(Date.now()),
      platform: platform,
      file: file ? file : null,
      location: location ? location: null
    }

    dispatch(createScheduledPost(scheduled_post))
    router.push('/');
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
    
    // Formatting date and time
    // const date = dayjs(dateString).format('YYYY-MM-DD');;
    // const time = dayjs(timeString).format('HH:mm');
    // const [hours, minutes] = time.split(':');
    // const [year, month, day] = date.split('-');
    // const isoString = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes)).toISOString();
    // console.log(isoString);

    const scheduled_post = {
      ...createScheduledPostDto,
      caption: createScheduledPostDto.caption ? createScheduledPostDto.caption : null,
      description: createScheduledPostDto.description ? createScheduledPostDto.description : null,
      media_type: (createScheduledPostDto.caption != '' || createScheduledPostDto.description != '') ? MediaType.Image : MediaType.Text,
      hashtags: hashtagList && hashtagList.length > 0 ? hashtagList: [],
      tagged_accounts: tagList && tagList.length > 0 ? tagList: [],
      scheduled_time: new Date(Date.now()),
      platform: platform,
      file: file ? file : null,
      location: location ? location: null
    }

    dispatch(createPost(scheduled_post))
    router.push('/');
    dispatch(updateAlert({ type: NotificationType.Info, message: 'Your post will be uploaded shortly.' }))
  }

  const handleTextChange = (fieldName: string, newText: string) => {
    setCreateScheduledPostDto((prevDto) => ({
      ...(prevDto || {}),
      [fieldName]: newText,
    }));
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
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
          {renderAvatar(1, FacebookIcon)}
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

  const renderDate = () => {
    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
      setDateString(dateString)
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
      setTimeString(timeString)
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
        value: influencer.name,
        label: influencer.name,
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
      <>
        <Col span={24}>
          <Text strong>Location:</Text>
        </Col>
        <Col span={24}>
          <Select
            variant="borderless"
            style={{ width: '100%' }}
            placeholder="Add Location"
            onChange={handleLocationChange}
            options={locationOptions}
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
            {renderCaption()}
            {renderDescription()}
            {renderHashtags()}
            {renderTaggedAccounts()}
            {renderLocation()}
            {renderScheduleTime()}
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