import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';

import './Calendar.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

// import styles from './Calendar.sass';

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

const EventAgenda = ({ event }) => {
    if (event.author) {
        console.log(this);
    }
    return <div>
        {event.desc}
        <p>{event.author}</p>
    </div>;
};

function EventHeader({ event }) {
    return <span> This is a header </span>
}


class WeekComponent extends React.Component {
    render() {
        return (
            <div>
                {this.props.event.title}
            </div>
        );
    }
}

const WeekHeader = ({ event }) => {
    return <div> asdf </div>;
};

class Rendering extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: events,
        };

        this.moveEvent = this.moveEvent.bind(this)
    }

    moveEvent({ event, start, end }) {
        const { events } = this.state;

        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };

        let nextEvents = [...events];
        console.log(nextEvents);
        nextEvents.splice(idx, 1, updatedEvent);
        console.log(nextEvents);

        this.setState({
            events: nextEvents
        });

        console.log(`${event.title} was dropped onto ${event.start}`);
    }

    test() {
        return <div>sdfg </div>;
    }

    eventStyleGetter(event) {
        console.log(event);
        let backgroundColor = event.author ? 'red' : 'white';
        // if (event.author) {
        //     console.log('У меня есть автор', event);
        //     backgroundColor = 'red';
        // }
        const style = {
            backgroundColor,
            borderRadius: '5%',
            opacity: 0.8,
            color: 'black',
            border: '2px',
            display: 'block',
            left: '5%',
            widht: '90%',
            size: '4px',
        };
        return {
            style,
        };
    }

    render() {
        let date = new Date();
        console.log(date);
        date.setHours(10, 0, 0);
        let maxDate = new Date();
        maxDate.setHours(20, 0, 0);

        return (
            <div id='Calendar' className='main'>
                <BigCalendar

                    culture='ru'
                    views={['week']}
                    toolbar={true}
                    onSelectEvent={this.test}
                    min={date}
                    max={maxDate}
                    events={events}
                    defaultDate={new Date(2015, 3, 6)}
                    defaultView='week'
                    eventPropGetter={this.eventStyleGetter}
                    components={{
                        event: Event,
                        week: {
                            event: WeekComponent,
                            header: EventHeader,
                        },
                    }}
                />
            </div>
        );


        /*return (
            <div className='main'>
                <DragAndDropCalendar
                    selectable
                    events={this.state.events}
                    onEventDrop={this.moveEvent}
                    culture='ru'
                    views={['week']}
                    toolbar={true}

                    min={date}
                    max={maxDate}
                    events={events}
                    defaultDate={new Date(2015, 3, 6)}
                    defaultView='week'
                />
            </div>
        );*/

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

