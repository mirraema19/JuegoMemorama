import React, { useState, useEffect } from 'react';

const Timer = ({ setTimerEnded, gameStarted, timeLeft }) => {
  const [seconds, setSeconds] = useState(timeLeft);

  useEffect(() => {
    setSeconds(timeLeft); // Update timer when timeLeft changes
  }, [timeLeft]);

  useEffect(() => {
    let timerId;
    if (gameStarted && seconds > 0) {
      timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0) {
      setTimerEnded(true);
    }
    return () => clearTimeout(timerId);
  }, [seconds, gameStarted, setTimerEnded]);

  return (
    <div className="timer">
      <h2>Tiempo restante: {seconds} segundos</h2>
    </div>
  );
};

export default Timer;
