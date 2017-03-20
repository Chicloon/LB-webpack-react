import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import myEventsList from './events';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
// import './less/styles.less';

// const myEventsList = [
//     {
//         'title': 'All Day Event',
//         'allDay': true,
//         'start': new Date(2015, 3, 0),
//         'end': new Date(2015, 3, 1)
//     },
//     {
//         'title': 'Long Event',
//         'start': new Date(2015, 3, 7),
//         'end': new Date(2015, 3, 10),
//         'author': 'Efim'
//     },

//     {
//         'title': 'DTS STARTS',
//         'start': new Date(2016, 2, 13, 0, 0, 0),
//         'end': new Date(2016, 2, 20, 0, 0, 0)
//     },

//     {
//         'title': 'DTS ENDS',
//         'start': new Date(2016, 10, 6, 0, 0, 0),
//         'end': new Date(2016, 10, 13, 0, 0, 0)
//     },

//     {
//         'title': 'Some Event',
//         'start': new Date(2015, 3, 9, 12, 0, 0),
//         'end': new Date(2015, 3, 9, 13, 0, 0)
//     },
//     {
//         'title': 'Some Event 2',
//         'start': new Date(2015, 3, 9, 13, 0, 0),
//         'end': new Date(2015, 3, 9, 14, 0, 0),
//         'author': 'Jack',
//     },
//     {
//         'title': 'I HAVE AUTHOR',
//         'start': new Date(2015, 3, 9, 15, 0, 0),
//         'end': new Date(2015, 3, 9, 16, 0, 0),
//         'author': 'Jack',
//     },
//     {
//         'title': 'Conference',
//         'start': new Date(2015, 3, 11),
//         'end': new Date(2015, 3, 13),
//         desc: 'Big conference for important people'
//     },
//     {
//         'title': 'Meeting',
//         'start': new Date(2015, 3, 12, 10, 30, 0, 0),
//         'end': new Date(2015, 3, 12, 12, 30, 0, 0),
//         desc: 'Pre-meeting meeting, to prepare for the meeting'
//     },
//     {
//         'title': 'Lunch',
//         'start': new Date(2015, 3, 12, 12, 0, 0, 0),
//         'end': new Date(2015, 3, 12, 13, 0, 0, 0),
//         desc: 'Power lunch'
//     },
//     {
//         'title': 'Meeting',
//         'start': new Date(2015, 3, 12, 14, 0, 0, 0),
//         'end': new Date(2015, 3, 12, 15, 0, 0, 0)
//     },
//     {
//         'title': 'Happy Hour',
//         'start': new Date(2015, 3, 12, 17, 0, 0, 0),
//         'end': new Date(2015, 3, 12, 17, 30, 0, 0),
//         desc: 'Most important meal of the day'
//     },
//     {
//         'title': 'Dinner',
//         'start': new Date(2015, 3, 12, 20, 0, 0, 0),
//         'end': new Date(2015, 3, 12, 21, 0, 0, 0)
//     },
//     {
//         'title': 'Birthday Party',
//         'start': new Date(2015, 3, 13, 7, 0, 0),
//         'end': new Date(2015, 3, 13, 10, 30, 0)
//     }
// ];

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

class Test extends React.Component {
    render() {
        return (
            <div className='example main'>

                <BigCalendar
                    events={myEventsList}
                    min={moment('10:00', 'HH:mm').toDate()}
                    max={moment('22:00', 'HH:mm').toDate()}
                    defaultDate={new Date(2015, 3, 1)}
                    defaultView='week'
                    messages={messages}
                />
            </div>
        );
    }
}

export default Test;
