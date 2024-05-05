import { Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaceHappy } from 'akar-icons';

const { Text } = Typography;

const TextWithGradientBorder: React.FC<ITextWithGradientBorderProps> = ({ 
  text, className, gradientText, editable, maxLength, onTextChange, emoji, placeholder
}) => {
  const outerBorderRadius = editable == false? '18px': '20px'
  const innerBorderRadius = editable  == false? '16px': '18px'
  const padding = editable == false? '5px 20px': '10px 18px'

  const [editedText, setEditedText] = useState(text);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // useEffect(() => {
  //   setEditedText(text);
  // }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newText = e.target.value;
    setEditedText(newText);
    if (onTextChange) {
      onTextChange(newText);
    }
  };

  return (
    <div 
      style={{ borderRadius: outerBorderRadius, height: 'auto' }}
      className="outer-gradient-border"
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
              autoSize
              placeholder={placeholder}
              defaultValue={text} 
            />
            {showEmojiPicker && (
              <div className="emoji-picker-container">
                <Picker data={data} onEmojiSelect={(emoji: any) => setEditedText(editedText + emoji.native)} />
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