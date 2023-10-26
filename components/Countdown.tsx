import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // D-day 날짜를 문자열로 받음
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = targetTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetDate]);

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
      <div className="countdown">
        {days}일 {hours.toString().padStart(2,'0')}시 {minutes.toString().padStart(2,'0')}분 {seconds.toString().padStart(2,'0')}초
      </div>
  );
};

export default Countdown;