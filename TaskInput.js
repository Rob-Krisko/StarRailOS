import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 80%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
`;

function TaskInput({ addToDo }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const { closeApp, openApps } = useContext(TaskbarContext);

  const handleSubmit = () => {
    addToDo(name, date);
    // Close the app after adding the task.
    const inputApp = openApps.find(app => app.name === 'Task Input');
    if (inputApp) closeApp(inputApp.id);
  };

  return (
    <InputContainer>
      <Input type="text" placeholder="Task Name" value={name} onChange={e => setName(e.target.value)} />
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <Button onClick={handleSubmit}>Add Task</Button>
    </InputContainer>
  );
}

export default TaskInput;
