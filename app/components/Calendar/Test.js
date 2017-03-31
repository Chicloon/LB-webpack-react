import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.less';

import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('ru');
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
    dateFormat: 'dd',
    dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dd DD MMM ', culture),
    timeGutterFormat: 'HH:mm',
    //   dayFormat: (date, culture, localizer) =>
    //     localizer.format(date, 'DDD', culture),

    eventTimeRangeFormat: ({ start, end }, culture, local) => null //убираем отображение времени
};

class Test extends React.Component {

    onSelect = (e) => {
        console.log(e);

        return {
            view: 'day',
        };
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

    eventNavigate = () => {
        console.log('navigate');
    }

    title = () => {
        return <span> this is a header </span>;
    }

    CustomToolbar = (toolbar) => {
        const date = moment(toolbar.date);

        const goToBack = () => {
            toolbar.date.setDate(toolbar.date.getDate() - 7);
            toolbar.onNavigate('prev');
        };

        const goToNext = () => {
            toolbar.date.setDate(toolbar.date.getDate() + 7);
            toolbar.onNavigate('next');
        };

        const goToCurrent = () => {
            const now = moment();
            toolbar.date.setFullYear(now.format('YYYY'), now.format('MM') - 1, now.format('DD'));
            toolbar.onNavigate('current');
        };

        // const label = () => {

        //     return (
        //         <span><b>{date.format('MMMM')}</b><span> {date.format('DD')} - {date.add(7, 'd').format('DD')}</span></span>
        //     );
        // };

        const prevButton = () => {
            if (date < moment().subtract(30, 'd')) {
                return null;
            }
            return <button className={['btn-back']} onClick={goToBack}>&#8249;</button>;
        };

        const nextButton = () => {
            if (date > moment().add(30, 'd')) {
                return null;
            }
            return <button className={['btn-next']} onClick={goToNext}>&#8250;</button>;
        };

        return (
            <div className={['toolbar-container']}>
                {/*<label className={['label-date']}>{label()}</label>*/}

                <div className={['back-next-buttons']}>
                    {prevButton()}
                    <button className={['btn-current']} onClick={goToCurrent}>Сегодня</button>
                    {nextButton()}


                </div>
            </div >
        );
    };


    render() {
        return (
            <div className='main'>
                <BigCalendar
                    onSelectEvent={this.onSelect}
                    events={events}
                    views={['week']}
                    min={moment('10:00', 'HH:mm').toDate()}
                    max={moment('19:00', 'HH:mm').toDate()}
                    defaultDate={new Date()}
                    defaultView='week'
                    messages={messages}
                    formats={formats}
                    onNavigate={this.eventNavigate}
                    eventPropGetter={this.eventStyleGetter}
                    titleAccessor={this.title}
                    components={{
                        event: this.Event,
                        toolbar: this.CustomToolbar,
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
