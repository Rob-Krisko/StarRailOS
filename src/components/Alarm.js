import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import alarmSound from '../assets/kuru.mp3'; // Adjust the path according to your directory structure

const AlarmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  color: #0FF;  // updated color for clock numbers
  background: #000;  
  font-family: 'Courier New', Courier, monospace; // added a "techy" font, feel free to change this
`;

const AlarmInput = styled.input`
  margin-bottom: 10px;
  color: #0FF; // updated color to match your theme
  background: #000; // background color as per your theme
  border: none; // removing the default border
  border-bottom: 2px solid #0FF; // underline style input
`;

const AlarmButton = styled.button`
  background: #800020; // updated color as per your theme
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #9A031E; // darker shade for hover
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const AlarmList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AlarmItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 200px;
  padding: 10px;
  border: 2px solid #0FF; // border color as per your theme
  margin-top: 10px;
`;

const AlarmModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8); // making it translucent so that the app in the background is slightly visible
  color: #0FF; // updated color as per your theme
  padding: 1em;
  border-radius: 8px;
  border: 2px solid #0FF; // adding a border to distinguish the modal
  box-shadow: 0px 0px 10px #0FF; // adding a glow effect around the modal to make it stand out
`;


const Alarm = () => {
  const [alarms, setAlarms] = useState([]);
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
  const [sound, setSound] = useState(null);
  const [timeouts, setTimeouts] = useState([]);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [snoozeLength, setSnoozeLength] = useState(5); // default snooze length is 5 minutes

  useEffect(() => {
    const audio = new Audio(alarmSound);
    audio.loop = true;
    setSound(audio);

    const savedAlarms = localStorage.getItem('alarms');
    if (savedAlarms) {
      const parsedAlarms = JSON.parse(savedAlarms);
      setAlarms(parsedAlarms);
      const newTimeouts = parsedAlarms.map((alarm) =>
        setTimeout(() => {
          audio.play();
          setAlarmTriggered(true);
        }, new Date(alarm.time).getTime() - new Date().getTime())
      );
      setTimeouts(newTimeouts);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []); // Empty array ensures that effect runs only once

  const handleAlarmDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleAlarmTimeChange = (e) => {
    setCurrentTime(e.target.value);
  };

  const handleAddAlarm = () => {
    const alarmDateTime = new Date(`${currentDate}T${currentTime}`);
    const newAlarms = [...alarms, { time: alarmDateTime }];
    setAlarms(newAlarms);
    localStorage.setItem('alarms', JSON.stringify(newAlarms));
    const newTimeout = setTimeout(() => {
      sound.play();
      setAlarmTriggered(true);
    }, alarmDateTime.getTime() - new Date().getTime());
    setTimeouts([...timeouts, newTimeout]);
  };

  const handleDeleteAlarm = (index) => {
    const newAlarms = [...alarms];
    newAlarms.splice(index, 1);
    setAlarms(newAlarms);
    localStorage.setItem('alarms', JSON.stringify(newAlarms));
    clearTimeout(timeouts[index]);
    const newTimeouts = [...timeouts];
    newTimeouts.splice(index, 1);
    setTimeouts(newTimeouts);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const handleSnoozeLengthChange = (e) => {
    setSnoozeLength(e.target.value);
  };

  const handleDismiss = () => {
    sound.pause();
    sound.currentTime = 0;
    setAlarmTriggered(false);
  };

  const handleSnooze = () => {
    sound.pause();
    sound.currentTime = 0;
    setAlarmTriggered(false);
    // snooze the alarm for the set snooze length
    const snoozeTimeout = setTimeout(() => {
      sound.play();
    }, snoozeLength * 60 * 1000); // snooze length is in minutes
    setTimeouts([...timeouts, snoozeTimeout]);
  };

  return (
    <AlarmWrapper>
      <AlarmInput type="date" value={currentDate} onChange={handleAlarmDateChange} />
      <AlarmInput type="time" value={currentTime} onChange={handleAlarmTimeChange} />
      <AlarmButton onClick={handleAddAlarm}>
        Add Alarm
      </AlarmButton>
      <AlarmList>
        {alarms.map((alarm, index) => (
          <AlarmItem key={index}>
            <span>{format(new Date(alarm.time), 'hh:mm:ss a')}</span>
            <AlarmButton onClick={() => handleDeleteAlarm(index)}>
              Delete
            </AlarmButton>
          </AlarmItem>
        ))}
      </AlarmList>
      {alarmTriggered && (
        <AlarmModal>
          <h1>Alarm is ringing!</h1>
          <AlarmButton onClick={handleDismiss}>
            Dismiss
          </AlarmButton>
          <AlarmInput type="number" min="1" max="60" value={snoozeLength} onChange={handleSnoozeLengthChange} />
          <AlarmButton onClick={handleSnooze}>
            Snooze
          </AlarmButton>
        </AlarmModal>
      )}
    </AlarmWrapper>
  );
};

export default Alarm;