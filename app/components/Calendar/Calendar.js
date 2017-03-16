import 'react-big-calendar/lib/css/react-big-calendar.css';

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

import styles from './Calendar.sass';

BigCalendar.momentLocalizer(moment);

function Event({ event }) {
    return (
        <span>
            <strong>
                {event.title}
            </strong>
            {event.desc && (':  ' + event.desc)}
        </span>
    );
}

function EventAgenda({ event }) {
    return <span> <em style={event.author ? { color: 'magenta' } : { color: 'blue' }}>{event.title}</em>
        <p>{event.desc}</p>
        <p>{event.author}</p>
    </span>
}

function EventHeader({ event }) {
    return <span> This is a header </span>
}

class Rendering extends React.Component {
    render() {
        let date = new Date();
        console.log(date);
        date.setHours(10, 0, 0);
        let maxDate = new Date();
        maxDate.setHours(20, 0, 0);

        return (
            <div id='Calendar' className={styles.main}>
                <BigCalendar
                    min={date}
                    max={maxDate}
                    events={events}
                    defaultDate={new Date(2015, 3, 1)}
                    defaultView='week'
                    components={{
                        event: Event,
                        agenda: {
                            event: EventAgenda,
                        },
                    }}
                />
            </div>
        );

        /*return (
            <div id='Calendar' className={styles.main}>
                <BigCalendar
                  
                    events={events}
                    defaultDate={new Date(2015, 3, 1)}
                  
                />
            </div>
        );*/
    }
}

export default Rendering;

