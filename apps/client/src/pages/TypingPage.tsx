import { useState, useRef, useEffect } from 'react';
import SelectProperty from '../components/SelectProperty';
import TypingChecker from '../components/TypingChecker';
import fonts from '../types/fonts';
import Header from '../components/Header';
import styled from '@emotion/styled';
import color from '../types/color';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

interface TypingResult {
  wpm: number;
  accuracy: number;
  errorRate: number;
}

const TypingPage = () => {
  const navigate = useNavigate();
  const [selectedSeconds, setSelectedSeconds] = useState(15);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);

  const [typedText, setTypedText] = useState('');
  const [originalText, setOriginalText] = useState('타자 연습할 문장을 여기에 준비하세요');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    setTimeLeft(selectedSeconds);
    setIsStarted(true);
  };

  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsStarted(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted]);

  const calculateTypingResult = (typedText: string, originalText: string, elapsedSeconds: number): TypingResult => {
    const minutes = elapsedSeconds / 60;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const wpm = wordsTyped / minutes;

    let correctCount = 0;
    const length = Math.min(typedText.length, originalText.length);
    for (let i = 0; i < length; i++) {
      if (typedText[i] === originalText[i]) correctCount++;
    }

    const accuracy = (correctCount / originalText.length) * 100;
    const errorRate = 100 - accuracy;

    return {
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy),
      errorRate: Math.round(errorRate),
    };
  };

  useEffect(() => {
    if (isFinished) {
      const typingResult = calculateTypingResult(typedText, originalText, selectedSeconds);
      navigate('/result', { state: typingResult });
    }
  }, [isFinished, navigate, typedText, originalText, selectedSeconds]);

  return (
    <StyledMainPage>
      <Header />
      {!isStarted && <SelectProperty setSelectedSeconds={setSelectedSeconds} />}
      <TimerDisplay isStarted={isStarted}>
        <h3 css={fonts.H3}>{timeLeft}초</h3>
      </TimerDisplay>
      <TypingChecker
        selectedSeconds={selectedSeconds}
        isStarted={isStarted}
        onTimeEnd={() => {
          setIsStarted(false);
          setIsFinished(true);
        }}
        setTypedText={setTypedText}
        setOriginalText={setOriginalText}
      />
      <StartButton onClick={handleStart} isStarted={isStarted}>
        <p css={fonts.btn1}>시작하기</p>
      </StartButton>
    </StyledMainPage>
  );
};

export default TypingPage;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), ${color.malgyulBlack};
  gap: 2rem;
`;

const TimerDisplay = styled.div<{ isStarted: boolean }>`
  font-size: 1.5rem;
  color: ${color.malgyulGreen};
  display: ${({ isStarted }) => (isStarted ? 'block' : 'none')};
`;

const StartButton = styled(Button)<{ isStarted: boolean }>`
  display: ${({ isStarted }) => (isStarted ? 'none' : 'block')};
`;
