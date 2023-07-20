import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin-left: 10px;
`;

function TaskModal({ isOpen, onClose, onSubmit, task }) {
  const [name, setName] = useState(task ? task.name : '');
  const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate) : new Date());

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      name,
      dueDate
    });
    setName('');
    setDueDate(new Date());
    onClose();
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Field>
          <Label>Task</Label>
          <Input type="text" value={name} onChange={e => setName(e.target.value)} />
        </Field>
        <Field>
          <Label>Due Date</Label>
          <DatePicker selected={dueDate} onChange={date => setDueDate(date)} />
        </Field>
        <Buttons>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Buttons>
      </ModalContainer>
    </ModalBackground>
  );
}

export default TaskModal;
