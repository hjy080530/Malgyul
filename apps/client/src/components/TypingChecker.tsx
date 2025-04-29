/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import fonts from '../types/fonts';
import color from '../types/color';

interface TypingCheckerProps {
  selectedSeconds: number;
  isStarted: boolean;
  onTimeEnd: () => void;
  setTypedText: (text: string) => void;
  setOriginalText: (text: string) => void;
}

const TypingChecker = ({ isStarted, onTimeEnd, setTypedText, setOriginalText }: TypingCheckerProps) => {
  const targetText = '사랑은 살아있는 것만 같아요 뒤돌아보지 않는 생명 처럼 잠깨서 비라도 내리면 그리워 한 게 누구였던가 너무나 아쉬운 하루같아요 어린아이와의 약속처럼 이대로 떠나가 야만 하나요 다시는 안오잖아요 이런 내 맘속에서 사는 것같이 비가 오는 날에는 더 살아숨쉬네 사랑은 살아있는 것만 같아요 뒤돌아보지않는 생명처럼 잠깨서 비라도 내리면 그리워 한 게 누구였던가 112';
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOriginalText(targetText);
  }, [setOriginalText]);

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
    setTypedText(input);
  }, [input, setTypedText]);

  useEffect(() => {
    if (isStarted && input.length === targetText.length) {
      onTimeEnd();
    }
  }, [input, isStarted, onTimeEnd]);

  useEffect(() => {
    if (textDisplayRef.current) {
      const element = textDisplayRef.current;
      const maxScroll = element.scrollHeight - element.clientHeight;
      if (input.length > 45 && element.scrollTop < maxScroll) {
        const scrollAmount = 1.1;
        element.scrollTop = Math.min(element.scrollTop + scrollAmount, maxScroll);
      }
    }
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted) return;

    const nextValue = e.target.value;
    if (nextValue.length <= targetText.length) {
      setInput(nextValue); // 무조건 입력 반영
    }
  };
  return (
    <StyledTypingChecker onClick={() => inputRef.current?.focus()}>
      <TextDisplay ref={textDisplayRef}>
        {targetText.split('').map((char, idx) => {
          const typedChar = input[idx];
          let status: 'correct' | 'wrong' | 'pending' = 'pending';

          if (typedChar != null) {
            status = typedChar === char ? 'correct' : 'wrong';
          }

          const isSpace = char === ' ';
          const displayChar = isSpace ? '\u00A0' : char;

          return (
            <Char key={idx} status={status} isSpace={isSpace}>
              {displayChar}
            </Char>
          );
        })}
        {input.length < targetText.length && <Caret />}
      </TextDisplay>
      <HiddenInput ref={inputRef} value={input} onChange={handleChange} />
    </StyledTypingChecker>
  );
};

export default TypingChecker;

const StyledTypingChecker = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 12px;
  font-family: ${fonts.P1};
  cursor: text;
  position: relative;
  width: 60%;
  height: 17rem;
  padding: 1rem;
  overflow: hidden;
`;

const TextDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
  font: ${fonts.P1};
  line-height: 1.5;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  padding-bottom: 0.5rem;
  white-space: nowrap;
`;

const Char = styled.span<{ status: 'correct' | 'wrong' | 'pending'; isSpace: boolean }>`
  color: ${({ status, isSpace }) =>
  isSpace
    ? '#ffffff55'
    : status === 'correct'
      ? color.malgyulWhite
      : status === 'wrong'
        ? color.malgyulRed
        : '#666666'};
  width: ${({ isSpace }) => (isSpace ? '0.8rem' : 'auto')};
  display: inline-block;
  text-align: center;
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