import { useState, useRef, useEffect } from 'react';
import SelectProperty from '../components/SelectProperty';
import TypingChecker from '../components/TypingChecker';
import styled from '@emotion/styled';
import color from '../types/color';
import fonts from '../types/fonts';
import Header from '../components/Header';

const TypingPage = () => {
  const [selectedSeconds, setSelectedSeconds] = useState(15);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
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

  return (
    <StyledMainPage>
      <Header />
      {!isStarted && <SelectProperty setSelectedSeconds={setSelectedSeconds} />}
      <TimerDisplay isStarted={isStarted}>
        <h3 css={fonts.H3}>남은 시간: {timeLeft}초</h3>
      </TimerDisplay>
      <TypingChecker
        selectedSeconds={selectedSeconds}
        isStarted={isStarted}
        onTimeEnd={() => setIsStarted(false)}
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