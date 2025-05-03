/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import ChooseButton from './ChooseButton';
import { useState } from 'react';
import fonts from '../types/fonts';
import color from '../types/color';
import { css } from '@emotion/react';

interface SelectPropertyProps {
  setSelectedSeconds: (seconds: number) => void;
  setSelectedType: (type: 'shortSutra' | 'longSutra') => void;
}

interface ChooseButtonStyledProps {
  isSelected: boolean;
}

const SelectProperty = ({ setSelectedSeconds, setSelectedType }: SelectPropertyProps) => {
  const [selectedIndexSeconds, setSelectedIndexSeconds] = useState<number>(0);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

  const timeOptions = ['십오 초', '삽십 초', '육십 초'];
  const timeValues = [15, 30, 60];

  const typeOptions = ['명언', '긴 글'];
  const typeValues: Array<'shortSutra' | 'longSutra'> = ['shortSutra', 'longSutra'];

  return (
    <Container>
      <ButtonGroup>
        {timeOptions.map((label, index) => (
          <StyledChooseButton
            key={index}
            isSelected={selectedIndexSeconds === index}
            onClick={() => {
              setSelectedIndexSeconds(index);
              setSelectedSeconds(timeValues[index]);
            }}
          >
            <p css={css`${fonts.btn2}`}>{label}</p>
          </StyledChooseButton>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {typeOptions.map((label, index) => (
          <StyledChooseButton
            key={index}
            isSelected={selectedTypeIndex === index}
            onClick={() => {
              setSelectedTypeIndex(index);
              setSelectedType(typeValues[index]);
            }}
          >
            <p css={css`${fonts.btn2}`}>{label}</p>
          </StyledChooseButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};

export default SelectProperty;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 95px;
  align-items: flex-start;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledChooseButton = styled(ChooseButton)<ChooseButtonStyledProps>`
  border: none;
  border-bottom: ${({ isSelected }) => (isSelected ? `5px solid ${color.malgyulGreen}` : 'none')};
  background: transparent;
  cursor: pointer;
  padding: 0;
  color: ${color.malgyulWhite};
  transition: border-bottom 0.2s ease-in-out;
`;