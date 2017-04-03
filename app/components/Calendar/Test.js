import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';



import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.less';

// import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('ru');
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer






// const dates = [];

// const specaility = '';

const min = moment('10:00', 'HH:mm').format('HH:mm');
const max = moment('18:00', 'HH:mm').format('HH:mm');
const today = moment(new Date()).format('YY/MM/DD');
const startDate = moment(`${today} 10:00`, 'YY/MM/DD HH:mm').toDate();
const endDate = moment(startDate).add(1, 'months').toDate();





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
@observer(['events'])
class Test extends React.Component {

    componentWillMount() {
        this.props.events.fetchAll(min, max, startDate, endDate, '');
        this.setState({ showModal: false });
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
        let backgroundColor = 'blue';
        switch (event.title) {
            case 'NA':
                backgroundColor = 'red';
                break;
            case 'free':
                backgroundColor = 'green';
                break;
            default:
                backgroundColor = 'blue';
        }

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
                <div className={['back-next-buttons']}>
                    {prevButton()}
                    <button className={['btn-current']} onClick={goToCurrent}>Сегодня</button>
                    {nextButton()}
                </div>
            </div >
        );
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    onSelect = (e) => {
        this.setState({
            showModal: true,
        });
        this.setState({
            dates: `${moment(e.start).format('MM/DD HH:mm')} - ${moment(e.end).format('MM/DD HH:mm')}`,

        });
            
        console.log(this.props);
        
        // this.handleOpenModal();
        // this.props.events.addNew(e);
    }

    render() {
        return (
            <div>
                <div className='main'>
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <button onClick={this.handleCloseModal} className="closeModal">X</button>
                        <p>Modal {this.state.dates} text!</p>

                    </Modal>
                    <BigCalendar
                        onSelectEvent={this.onSelect}
                        events={this.props.events.dates.slice()}
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
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Test;
