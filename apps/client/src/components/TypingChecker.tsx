import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import fonts from '../types/fonts';
import color from '../types/color';

interface TypingCheckerProps {
  isStarted: boolean;
  onTimeEnd: () => void;
  setTypedText: (text: string) => void;
  setOriginalText: (text: string) => void;
  originalText: string;
}

const TypingChecker = ({
                         isStarted,
                         onTimeEnd,
                         setTypedText,
                         originalText,
                       }: TypingCheckerProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTypedText(input);
  }, [input]);

  useEffect(() => {
    if (isStarted) {
      setInput('');
      inputRef.current?.focus();
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && input.length === originalText.length) {
      onTimeEnd();
    }
  }, [input, isStarted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted) return;
    const next = e.target.value;
    if (next.length <= originalText.length) {
      setInput(next);
    }
  };

  return (
    <StyledTypingChecker onClick={() => inputRef.current?.focus()}>
      <TextDisplay ref={textDisplayRef}>
        {originalText.split('').map((char, idx) => {
          const typed = input[idx];
          const status =
            typed == null
              ? 'pending'
              : typed === char
                ? 'correct'
                : 'wrong';

          const isSpace = char === ' ';
          return (
            <Char key={idx} status={status} isSpace={isSpace}>
              {isSpace ? '\u00A0' : char}
            </Char>
          );
        })}
        {input.length < originalText.length && <Caret />}
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
