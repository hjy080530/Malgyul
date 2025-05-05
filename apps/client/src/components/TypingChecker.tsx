/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import fonts from '../types/fonts';
import color from '../types/color';

interface TypingCheckerProps {
  isStarted: boolean;
  onTimeEnd: () => void;
  setTypedText: (text: string) => void;
  originalText: string;
}

const TypingChecker = ({
                         isStarted,
                         onTimeEnd,
                         setTypedText,
                         originalText ,
                       }: TypingCheckerProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

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
    if (isStarted && input.length >= originalText.length) {
      onTimeEnd();
    }
  }, [input, isStarted, originalText.length, onTimeEnd, setTypedText]);

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
  font: ${fonts.P1};
  line-height: 1.5;
  max-height: 300px;
  overflow-y: hidden;
  width: 100%;
  padding-bottom: 0.5rem;
  white-space: nowrap;
  caret-color: transparent; 
  caret-display: none;
`;

const Char = styled.span<{ status: 'correct' | 'wrong' | 'pending'; isSpace: boolean }>`
  color: ${({ status }) =>
  status === 'correct'
    ? color.malgyulWhite
    : status === 'wrong'
      ? color.malgyulRed
      : '#666666'};
  white-space: ${({ isSpace }) => (isSpace ? 'pre' : 'normal')};
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  top: 0;
`;

const Caret = styled.span`
  caret-color: transparent;
  caret-display: none;
`;