import { Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const TextWithGradientBorder: React.FC<ITextWithGradientBorderProps> = ({ text, className, gradientText, size }) => {
  const outerBorderRadius = size == 'small'? '20px': '18px'
  const innerBorderRadius = size == 'small'? '18px': '16px'
  const padding = size == 'small'? '5px 20px': '10px 18px'

  return (
    <div 
      style={{ borderRadius: outerBorderRadius }}
      className="outer-gradient-border"
    >
      <div 
        style={{ padding: padding, borderRadius: innerBorderRadius }} 
        className={className ? `inner-text ${className}` : 'inner-text'}
      >
        <Text 
          className={gradientText ? 'gradient-text' : ''}>{text}</Text>
      </div>
    </div>
  );
};

export default TextWithGradientBorder;