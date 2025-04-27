import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectProperty from '../components/SelectProperty';
import TypingChecker from '../components/TypingChecker';
import fonts from '../types/fonts';
import Header from '../components/Header';
import styled from '@emotion/styled';
import color from '../types/color';

const TypingPage = () => {
  const [selectedSeconds, setSelectedSeconds] = useState(15);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isFinished) {
      navigate('/result');
    }
  }, [isFinished, navigate]);

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
      />
      <StartButton onClick={handleStart}>시작하기</StartButton>
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
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), ${color.malgyulBlack};
  gap: 2rem;
`;

const TimerDisplay = styled.div<{ isStarted: boolean }>`
  font-size: 1.5rem;
  color: ${color.malgyulGreen};
  display: ${({ isStarted }) => (isStarted ? 'block' : 'none')};
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: ${color.malgyulGreen};
  color: ${color.malgyulWhite};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;