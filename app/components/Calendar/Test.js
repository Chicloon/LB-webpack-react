import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.less';

import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const messages = {
    next: "Вперед",
    previous: "Назад",
    today: "Сегодня",
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
};

const formats = {
    dateFormat: 'Z',
    timeGutterFormat: 'h',
//   dayFormat: (date, culture, localizer) =>
//     localizer.format(date, 'DDD', culture),

//   dayRangeHeaderFormat: ({ start, end }, culture, local) =>
//     local.format(start, { date: 'short' }, culture) + ' — ' +
//     local.format(end, { date: 'short' }, culture)
};

class Test extends React.Component {

    onSelect = (e) => {
        console.log(e);
    }


    Event = ({ event }) => {
        return (
            <span>
                <strong>
                    {event.title}
                </strong>
                {event.desc && (':  ' + event.desc)}
            </span>
        );
    }

    EventWeek = ({ event }) => {
        // console.log(event);
        return <span>
            <em style={{ color: 'magenta' }}>{event.title}</em>
            <p>{event.desc}</p>
        </span>
    }

    EventHeader = (event) => {
        return <span> this is a header </span>;
    }


    eventStyleGetter(event) {
        // console.log(event);
        const backgroundColor = event.title === 'NA' ? 'red' : 'blue';
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
        return (
            <div className='main'>
                {/*<p> adfl;askjdfas df </p>
                <br /> <br /><br /><br /><br /><br />
                <br /> <br /><br /><br /><br /><br />
                <p> asdfasdfasdf </p>*/}
                <BigCalendar
                    onSelectEvent={this.onSelect}
                    events={events}
                    min={moment('10:00', 'HH:mm').toDate()}
                    max={moment('19:00', 'HH:mm').toDate()}
                    defaultDate={new Date()}
                    defaultView='week'
                    messages={messages}
                    formats={formats}
                    eventPropGetter={this.eventStyleGetter}
                    components={{
                        event: this.Event,
                        week: {
                            time: this.EventHeader,
                            event: this.EventWeek,
                        }
                    }}
                />
            </div>
        );
    }
}

export default Test;
