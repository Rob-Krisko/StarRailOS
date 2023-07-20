import React, { useContext } from 'react';
import styled from 'styled-components';
import { TaskbarContext } from './TaskbarContext';

const TaskManagerContainer = styled.div`
  padding: 20px;
  color: white;
  height: 100%;
  overflow: auto;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
  padding: 10px;
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function TaskManager() {
  const { openApps, closeApp } = useContext(TaskbarContext);

  return (
    <TaskManagerContainer>
      {openApps.map(app => (
        <Task key={app.id}>
          <span>{app.name}</span>
          <CloseButton onClick={(event) => {
            event.stopPropagation();
            closeApp(app.id);
          }}>X</CloseButton>
        </Task>
      ))}
    </TaskManagerContainer>
  );
}

export default TaskManager;
