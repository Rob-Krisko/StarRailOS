import React, { useEffect, useState } from 'react';
import { format, isPast } from 'date-fns';
import styled from 'styled-components';
import alarmSound from '../assets/kuru.mp3'; // Adjust the path according to your directory structure

const AlarmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  color: #fff;
  background: #000;  // adjust the color as per your space theme
`;

const AlarmInput = styled.input`
  margin-bottom: 10px;
`;

const AlarmButton = styled.button`
  // styling for the button
`;

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const audio = new Audio(alarmSound);
    audio.loop = true;
    setSound(audio);

    const timer = setInterval(() => {
      if (isPast(alarmTime)) {
        setMessage('Alarm is ringing!');
        audio.play();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [alarmTime]);

  const handleAlarmTimeChange = (e) => {
    setAlarmTime(new Date(e.target.value));
    setMessage('');
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const handleDismiss = () => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
    setMessage('');
  };

  return (
    <AlarmWrapper>
      <AlarmInput type="datetime-local" onChange={handleAlarmTimeChange} />
      <p>{message}</p>
      {message && <AlarmButton onClick={handleDismiss}>Dismiss</AlarmButton>}
    </AlarmWrapper>
  );
};

export default Alarm;
