import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TaskInput from './TaskInput';
import spaceBackground from '../space.jpg';
import { TaskbarContext } from './TaskbarContext';

const Container = styled.div`
  position: absolute;
  top: 25px; // adjust to your title bar's height
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${spaceBackground});
  background-size: cover;
  background-position: center;
  padding: 10px;
  overflow: auto;
`;



const ToDoItem = styled.div`
  width: 80%;
  padding: 10px;
  border: 1px solid #fff;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
`;

const AddTaskButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;

function ToDoApp() {
  const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem('toDoList')) || []);
  const { openApp } = useContext(TaskbarContext);

  const addToDo = (name, date) => {
    const newToDoList = [...toDoList, { name, date, id: Date.now(), completed: false }];
    setToDoList(newToDoList);
    localStorage.setItem('toDoList', JSON.stringify(newToDoList));
  };

  const handleAddTask = () => {
    console.log("Handle add task button pressed");
    openApp('Task Input', <TaskInput addToDo={addToDo} />);
  };
  

  const handleCompleteTask = (id) => {
    const updatedToDoList = toDoList.map(item => item.id === id ? {...item, completed: !item.completed} : item);
    setToDoList(updatedToDoList);
    localStorage.setItem('toDoList', JSON.stringify(updatedToDoList));
  };

  const handleDeleteTask = (id) => {
    const updatedToDoList = toDoList.filter(item => item.id !== id);
    setToDoList(updatedToDoList);
    localStorage.setItem('toDoList', JSON.stringify(updatedToDoList));
  };

  return (
    <Container>
      {toDoList.map((item) => (
        <ToDoItem key={item.id}>
          <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.name} - {item.date}</span>
          <div>
            <button onClick={() => handleCompleteTask(item.id)}>Complete</button>
            <button onClick={() => handleDeleteTask(item.id)}>Delete</button>
          </div>
        </ToDoItem>
      ))}
      <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>
    </Container>
  );
}

export default ToDoApp;
