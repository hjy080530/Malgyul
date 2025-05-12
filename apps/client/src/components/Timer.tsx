import { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
}

const Timer = ({ seconds }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
      남은 시간: {timeLeft}초
    </div>
  );
};

export default Timer;
