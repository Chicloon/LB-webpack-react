import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import doctors from './doctors';

import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/less/styles.less';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

// import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
moment.locale('ru');

const DragAndDropCalendar = withDragAndDrop(BigCalendar);


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
        // console.log(event);
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



    MyCustomHeader = () => <div>
                    CUSTOM HEADER:
        </div>;
    
    render() {
        console.log(doctors[0].working.hours);

        const min = moment('10:00', 'HH:mm').toDate();
        const max = moment('20:00', 'HH:mm').toDate();

        /*return (
            <div id='Calendar' className='main'>
                <BigCalendar

                    culture='ru'
                    views={['week']}
                    toolbar={false}
                    onSelectEvent={this.test}
                    min={min}
                    max={max}
                    events={events}
                    defaultDate={new Date(2015, 3, 6)}
                    defaultView='week'
                    eventPropGetter={this.eventStyleGetter}
                   
                />
            </div>
        );*/
 
        return (
            <div className='main'>

                <BigCalendar
                    
                    culture='ru'
                    titleAccessor='author'
                    defaultView='week'
                    popup
                    defaultDate={new Date(2015, 3, 6)}
                    events={events}
                    components={{
                        header: this.MyCustomHeader,
                        week: {
                            header: this.MyCustomHeader,
                        }
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

