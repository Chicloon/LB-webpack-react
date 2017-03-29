import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.less';

import myEventsList from './events';

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

    onSelect = (e) => {
        console.log(e);
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
                    events={myEventsList}
                    min={moment('10:00', 'HH:mm').toDate()}
                    max={moment('19:00', 'HH:mm').toDate()}
                    defaultDate={new Date(2015, 3, 13)}
                    defaultView='week'
                    messages={messages}
                />
            </div>
        );
    }
}

export default Test;
