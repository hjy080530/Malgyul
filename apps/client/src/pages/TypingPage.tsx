import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRandomLongSutra } from '../services/api';
import TypingChecker from '../components/TypingChecker';
import SelectProperty from '../components/SelectProperty';

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
  const [originalText, setOriginalText] = useState('문장을 불러오는 중...');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = async () => {
    setTimeLeft(selectedSeconds);
    setIsStarted(true);
    setIsFinished(false);

    if (selectedType === 'longSutra') {
      try {
        const result = await fetchRandomLongSutra();
        setOriginalText(result?.text || '불러오기 실패');
      } catch {
        setOriginalText('불러오기 실패');
      }
    } else {
      setOriginalText('짧은 문장을 여기에 직접 입력하거나 DB에서 가져오세요.');
    }
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
    <div>
      {!isStarted && (
        <SelectProperty
          setSelectedSeconds={setSelectedSeconds}
          setSelectedType={setSelectedType}
        />
      )}
      <div>남은 시간: {timeLeft}초</div>
      <TypingChecker
        isStarted={isStarted}
        onTimeEnd={() => {
          setIsStarted(false);
          setIsFinished(true);
        }}
        setTypedText={setTypedText}
        originalText={originalText}
      />
      <button onClick={handleStart} disabled={isStarted}>
        시작하기
      </button>
    </div>
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
