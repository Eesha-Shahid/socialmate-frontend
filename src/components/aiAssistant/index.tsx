import React, { useState } from 'react';
import { Button, Col, Drawer, Input, Row, Space, Typography } from 'antd';
import { IAiAssistantProps } from './types';
import TextWithGradientBorder from '../textWithGradientBorder';
import { useSelector } from 'react-redux';
import { SchedulerHubSelector } from '@/redux/reducers';
import { useAppDispatch } from '@/redux/store';
import { generateCaption } from '@/redux/actions/schedulerHubAction';

const { Title, Text } = Typography;

const AiAssistant: React.FC<IAiAssistantProps> = ({ visible, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { generatedCaption, generatedCaptionLoading } = useSelector(SchedulerHubSelector);

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    console.log(selectedSuggestion)
  };

  const handleGenerateClick = () => {
    console.log('Prompt:', inputValue);
    dispatch(generateCaption({ queryString: inputValue }));
    setSelectedSuggestion(null);
  };

  // const suggestions = [
  //   'Sample Caption Sample Caption Sample Caption Sample Caption Sample Caption Sample Caption', 
  //   'Sample Caption Sample Caption Sample Caption Sample Caption Sample Caption', 
  //   'Sample Caption Sample Caption Sample Caption'
  // ];

  return (
    <Drawer
      width={550}
      placement="right"
      closable={true}
      onClose={onClose}
      open={visible}
      title={
        <Row justify="space-between" align="middle">
          <Col span={20}>
            <Title level={4} className="gradient-text" style={{ textAlign: 'center', marginBottom: '26.6px' }}>AI Assistant</Title>
          </Col>
          <Col span={4}>
            <Button type="primary" size="small">Select</Button>
          </Col>
        </Row>
      }
    >
      <Row>
        <Title level={5}>What do you want to write about?</Title>
        <Col span={24}>
          <TextWithGradientBorder
            text={inputValue}
            onTextChange={(newText) => handleInputChange(newText)}
            placeholder="E.g. Promote my photography course to get new signups. Registration closes in 3 days."
            button='Generate'
            loading={generatedCaptionLoading}
            onButtonClick={handleGenerateClick}
          />
        </Col>
        <Text type="secondary" style={{ marginTop: '10px' }}>Pro tip: Include key points, your target audience and your desired outcome for this post.</Text>
        <Title level={5} style={{ marginTop: '25px' }}>Suggestions:</Title>
        <Space direction="vertical">
          {generatedCaption?.map((suggestion, index) => (
            <TextWithGradientBorder
              key={index}
              className={selectedSuggestion === suggestion ? "" : "text-mute"} 
              editable={false}
              text={suggestion}
              selected={selectedSuggestion === suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            />
          ))}
        </Space>
      </Row>
    </Drawer>
  );
};

export default AiAssistant;
