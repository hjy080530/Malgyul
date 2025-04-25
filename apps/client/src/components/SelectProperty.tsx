/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ChooseButton, { SelectButtonProps } from './ChooseButton';
import { useState } from 'react';
import fonts from '../types/fonts'; // Ensure fonts are being imported correctly
import color from '../types/color';
import { css } from '@emotion/react';

interface ChooseButtonStyledProps extends SelectButtonProps {
  isSelected: boolean;
}

const SelectProperty = () => {
  const [selectedIndexSeconds, setSelectedIndexSeconds] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const optionsSeconds = ['십오 초', '삽십 초', '육십 초'];
  const optionsString = ['명언', '긴 글'];

  return (
    <StyledChooseSort>
      <SecondsSort>
        {optionsSeconds.map((label, index) => (
          <StyledChooseButton
            key={index}
            isSelected={selectedIndexSeconds === index}
            onClick={() => setSelectedIndexSeconds(index)}
          >
            <p
              css={css`
                ${fonts.btn2}
              `}
            >
              {label}
            </p>
          </StyledChooseButton>
        ))}
      </SecondsSort>
      <SecondsSort>
        {optionsString.map((label, index) => (
          <StyledChooseButton
            key={index}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <p
              css={css`
                ${fonts.btn2}
              `}
            >
              {label}
            </p>
          </StyledChooseButton>
        ))}
      </SecondsSort>
    </StyledChooseSort>
  );
};

export default SelectProperty;

const StyledChooseSort = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 95px;
  align-items: flex-start;
`;

const SecondsSort = styled.div`
  display: flex;
  width: fit-content;
  gap: 20px;
  height: fit-content;
`;

const StyledChooseButton = styled(ChooseButton)<ChooseButtonStyledProps>`
  border: none;
  border-bottom: ${({ isSelected }) => (isSelected ? `5px solid ${color.malgyulGreen}` : 'none')};
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: border-bottom 0.2s ease-in-out;
  color: ${color.malgyulWhite};
`;
