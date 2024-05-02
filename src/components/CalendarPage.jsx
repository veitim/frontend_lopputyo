import { Calendar, dateFnsLocalizer, dayjsLocalizer } from 'react-big-calendar'
import { useState, useEffect } from "react";
import dayjs from 'dayjs'

import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPage () {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({title: '', end:'', start: '' });
    const localizer = dayjsLocalizer(dayjs)
    useEffect(() => {fetchData()}, []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => {
          console.error(error)
        })
    };

    const addEvent = (e) => {
        var i = 0;
        let length = trainings.length;
        while (i<length) {
            e.preventDefault();
            setNewEvent ({...newEvent,
            title: trainings[i].activity +" / "+trainings[i].customer.firstname +" "+ trainings[i].customer.lastname, 
            end: dayjs(trainings[i].date).add(trainings[i].duration, "minutes").toDate(), 
            start: dayjs(trainings[i].date).toDate()
            })
            setEvents([...events, newEvent])
            console.log(newEvent)
         i = i+1;
            console.log(i)
        }
    };

    console.log(trainings)
    console.log(events)
    
    return (
        <div>
            <button onClick={addEvent}>Add</button>
        <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        startAccessor="start"
        endAccessor="end"
        events={events}
        style={{ height: 500, margin: "50px" }}
        />
    </div>
    );
}

export default CalendarPage;