import { Button, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaceHappy } from 'akar-icons';
import { useSelector } from 'react-redux';
import { SchedulerHubSelector } from '@/redux/reducers';
import { useAppDispatch } from '@/redux/store';
import { generateCaption } from '@/redux/actions/schedulerHubAction';

const { Text } = Typography;

const TextWithGradientBorder: React.FC<ITextWithGradientBorderProps> = ({ 
  text, className, gradientText, editable, maxLength, onTextChange, emoji, placeholder, selected, onClick, button, onButtonClick, loading
}) => {
  const autoSize = selected == null ? true: { minRows: 3, maxRows: 10} 
  const outerBorderRadius = editable == false? '18px': '20px'
  const innerBorderRadius = editable  == false? '16px': '18px'
  const padding = editable == false? '5px 20px': '10px 18px'

  const [editedText, setEditedText] = useState(text);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const borderColor = (selected == null) || (selected == true)
    ? "linear-gradient(90deg, #5082ED 0%, #9A72CB 27%, #B86DA2 63%, #D96570 100%)" 
    : "rgba(0, 0, 0, 0.45)"

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newText = e.target.value;
    setEditedText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  };

  const handleEmojiChange = (emoji: any) => {
    const newText = editedText + emoji.native;
    setEditedText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
    console.log(newText)
  }

  return (
    <div 
      style={{ background: borderColor, borderRadius: outerBorderRadius, height: 'auto', cursor: 'pointer' }}
      className="outer-gradient-border"
      onClick={onClick}
    >
      <div 
        style={{ padding: padding, borderRadius: innerBorderRadius, height: 'auto' }} 
        className={className ? `inner-text ${className}` : 'inner-text'}
      >
        {editable == false? 
          <Text className={gradientText ? 'gradient-text' : ''}>{text}</Text>:
          <>
            <TextArea 
              value={editedText}
              onChange={handleTextChange}
              showCount={Boolean(maxLength)}
              maxLength={maxLength}
              style={{ border: 'none' }} 
              className={gradientText ? 'gradient-text' : ''} 
              placeholder={placeholder}
              defaultValue={text} 
              autoSize={autoSize}
            />
            {button && (
              <Button style={{ marginTop: '1rem', display: 'flex' , alignSelf: 'flex-end' }} loading={loading} className='gradient-btn' type="primary" onClick={onButtonClick}>{button}</Button>
            )}
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <Picker data={data} onEmojiSelect={handleEmojiChange} />
              </div>
            )}
            {emoji && (
              <div className='emoji-button-container'>
                <FaceHappy className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} strokeWidth={1} size={20} />
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default TextWithGradientBorder;