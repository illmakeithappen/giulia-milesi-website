'use client';

import React from 'react';
import letterConfig from '@/public/fonts/custom-handwriting/letters.json';
import styles from './CustomText.module.css';

interface CustomTextProps {
  text: string;
  className?: string;
  color?: string;
  spacing?: number;
  letterHeight?: number;
  fallbackToRegular?: boolean;
}

export const CustomText: React.FC<CustomTextProps> = ({
  text,
  className = '',
  color = letterConfig.defaultColor,
  spacing = letterConfig.defaultSpacing,
  letterHeight = 40,
  fallbackToRegular = true,
}) => {
  const availableChars = new Set(letterConfig.availableCharacters);

  const renderCharacter = (char: string, index: number) => {
    const lowerChar = char.toLowerCase();

    // Handle spaces
    if (char === ' ') {
      return (
        <span
          key={index}
          style={{ display: 'inline-block', width: `${letterHeight * 0.5}px` }}
        />
      );
    }

    // Check if character is available
    if (!availableChars.has(lowerChar)) {
      if (fallbackToRegular) {
        return (
          <span
            key={index}
            style={{
              fontSize: `${letterHeight}px`,
              marginRight: `${spacing}px`,
              color,
            }}
          >
            {char}
          </span>
        );
      }
      return null;
    }

    const svgPath = letterConfig.letterMapping[lowerChar as keyof typeof letterConfig.letterMapping];

    return (
      <span
        key={index}
        className={styles.customHandwritingLetter}
        style={{
          height: `${letterHeight}px`,
          width: 'auto',
          display: 'inline-block',
          marginRight: `${spacing}px`,
          color,
        }}
      >
        <img
          src={svgPath}
          alt={char}
          style={{
            height: '100%',
            width: 'auto',
            filter: `drop-shadow(0 0 0 ${color})`,
          }}
        />
      </span>
    );
  };

  return (
    <div
      className={`${styles.customTextContainer} ${className}`}
      style={{ color }}
    >
      {text.split('').map((char, index) => renderCharacter(char, index))}
    </div>
  );
};

export default CustomText;
