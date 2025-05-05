/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TypingChecker from '../components/TypingChecker';
import SelectProperty from '../components/SelectProperty';
import color from '../types/color';
import Button from '../components/Button';
import { loadSutras } from '../utills/loadSutras';
import Header from '../components/Header';
import { css } from '@emotion/react';
import font from '../types/fonts';

interface TypingResult {
  wpm: number;
  accuracy: number;
  errorRate: number;
}

const TypingPage = () => {
  const navigate = useNavigate();
  const [selectedSeconds, setSelectedSeconds] = useState(15);
  const [selectedType, setSelectedType] = useState<'shortSutra' | 'longSutra'>('shortSutra');
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [originalText, setOriginalText] = useState('듣고 싶은 부처님의 말씀을 정해보세요');

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = async () => {
    const data = await loadSutras();
    let selected = '';

    if (selectedType === 'shortSutra') {
      selected = [...data.shortSutra]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
        .join(' ');
    } else {
      selected = data.longSutra[Math.floor(Math.random() * data.longSutra.length)];
    }
    setOriginalText(selected);
    setTypedText('');
    setTimeLeft(selectedSeconds);
    setIsFinished(false);
    setIsStarted(true); // ⭐ 이건 제일 마지막에 해줘야해!
  };

  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
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

  useEffect(() => {
    if (isFinished) {
      const result = calculateTypingResult(typedText, originalText, selectedSeconds);
      navigate('/result', { state: result });
    }
  }, [isFinished]);

  const calculateTypingResult = (typed: string, original: string, seconds: number): TypingResult => {
    const minutes = seconds / 60;
    const words = typed.trim().split(/\s+/).length;
    const wpm = words / minutes;

    let correct = 0;
    for (let i = 0; i < Math.min(typed.length, original.length); i++) {
      if (typed[i] === original[i]) correct++;
    }

    const accuracy = (correct / original.length) * 100;
    const errorRate = 100 - accuracy;

    return {
      wpm: Math.round(wpm),
      accuracy: Math.round(accuracy),
      errorRate: Math.round(errorRate),
    };
  };

  return (
    <StyledMainPage>
      <Header />
      <StyledMainDisplay>
      {!isStarted && (
        <SelectProperty
          setSelectedSeconds={setSelectedSeconds}
          setSelectedType={setSelectedType}
        />
      )}
      {originalText && (
        <>
          {isStarted &&
            <TimerDisplay>
              <h1

              css={[
                font.H1,
                css`
              color: ${color.malgyulGreen};
            `,
              ]}
              >{timeLeft}초</h1>

            </TimerDisplay>}
          <TypingChecker
            isStarted={isStarted}
            onTimeEnd={() => {
              setIsStarted(false);
              setIsFinished(true);
            }}
            setTypedText={setTypedText}
            originalText={originalText}
          />
        </>
      )}
      </StyledMainDisplay>
      {!isStarted && (
        <StartButton onClick={handleStart} isStarted={false}>
          시작하기
        </StartButton>
      )}
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
  gap: 11rem;
`;
const StyledMainDisplay=styled.div`
  width: 90%;
  height: 100%;
  gap: 2rem;  
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TimerDisplay = styled.div`
  font-size: 1.5rem;
  color: ${color.malgyulGreen};
`;

const StartButton = styled(Button)<{ isStarted: boolean }>`
  display: ${({ isStarted }) => (isStarted ? 'none' : 'block')};
`;