import React, { useState, useEffect } from 'react';

const Chronometre = ({ onStopTimer, isRunning }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let startTime = Date.now();

    const interval = setInterval(() => {
      if (isRunning) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Temps écoulé en secondes
        setTimer(elapsedTime);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) {
      onStopTimer(timer);
    }
  }, [isRunning, onStopTimer, timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <h1>{formatTime(timer)}</h1>
  );
};

export default Chronometre;
