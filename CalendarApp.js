import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const StyledCalendarContainer = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  right: 0px;
  width: 600px; 
  height: 450px; 
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #72032c;
  background-color: #282828;

  .rbc-toolbar {
    background-color: #282828;
    color: white;
  }

  .rbc-calendar {
    background-color: #282828;
    color: white;
  }

  .rbc-btn-group {
    background-color: #282828;
    color: white;
  }

  .rbc-date-cell {
    color: #0FF;
    font-weight: bold;
    font-size: 1.2em;
  }

  .rbc-today {
    background-color: #800020;
    color: white;
  }

  .rbc-month-view .rbc-header, .rbc-time-view .rbc-header {
    background-color: #282828;
    color: white;
  }

  .rbc-day-slot .rbc-event {
    background-color: #72032c;
    color: white;
  }
`;

function CalendarApp() {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Please enter event name');
    if (title) {
      const newEvents = [
        ...events,
        {
          start,
          end,
          title,
        },
      ];
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
    }
  };

  const handleSelectEvent = (event) => {
    const title = window.prompt('Please edit event name, or leave empty to delete', event.title);
    if (title === null) {
      // User cancelled the prompt, do nothing
      return;
    } else if (title === '') {
      // User left the prompt empty, confirm if they want to delete the event
      const confirmDelete = window.confirm('Are you sure you want to delete this event?');
      if (confirmDelete) {
        const newEvents = events.filter(e => e !== event);
        setEvents(newEvents);
        localStorage.setItem("events", JSON.stringify(newEvents));
      }
    } else {
      // User edited the event name
      const newEvents = events.map(e => e === event ? { ...e, title } : e);
      setEvents(newEvents);
      localStorage.setItem("events", JSON.stringify(newEvents));
    }
  };


  return (
    <StyledCalendarContainer
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
    >
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100%" }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
      />
    </StyledCalendarContainer>
  );
}

export default CalendarApp;
