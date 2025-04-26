/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import fonts from '../types/fonts';
import color from '../types/color';

interface TypingCheckerProps {
  selectedSeconds: number;
  isStarted: boolean;
  onTimeEnd: () => void;
}


const TypingChecker = ({ isStarted, onTimeEnd }: TypingCheckerProps) => {
  const targetText = '예시 문장입니다';
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isStarted) {
      setInput('');
      inputRef.current?.focus();
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && input.length === targetText.length) {
      onTimeEnd();
    }
  }, [input, isStarted, onTimeEnd]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    if (nextValue.length <= targetText.length) {
      setInput(nextValue);
    }
  };

  return (
    <StyledTypingChecker onClick={() => inputRef.current?.focus()}>
      <TextDisplay>
        {targetText.split('').map((char, idx) => {
          const typedChar = input[idx];
          let status: 'correct' | 'wrong' | 'pending' = 'pending';
          if (typedChar != null) {
            status = typedChar === char ? 'correct' : 'wrong';
          }
          return (
            <Char key={idx} status={status}>
              {typedChar != null ? typedChar : char}
            </Char>
          );
        })}
        {input.length < targetText.length && <Caret />}
      </TextDisplay>
      <HiddenInput
        ref={inputRef}
        value={input}
        onChange={handleChange}
      />
    </StyledTypingChecker>
  );
};

export default TypingChecker;

const StyledTypingChecker = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 12px;
  font-family: ${fonts.P1};
  cursor: text;
  position: relative;
  width: 60%;
  padding: 1rem;
`;

const TextDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`;

const Char = styled.span<{ status: 'correct' | 'wrong' | 'pending' }>`
  color: ${({ status }) =>
  status === 'correct' ? color.malgyulWhite : status === 'wrong' ? color.malgyulRed : '#666666'};
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  top: 0;
`;

const Caret = styled.span`
  width: 1px;
  background-color: ${color.malgyulWhite};
  animation: blink 1s step-start infinite;
  margin-left: 1px;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;