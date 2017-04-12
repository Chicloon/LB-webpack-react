import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';

import ModalContent from './ModalContent';
import config from './calendarConfig';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.less';


// import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('ru');
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer






// const dates = [];

// const specaility = '';

// const min = moment('10:00', 'HH:mm').format('HH:mm');
// const max = moment('18:00', 'HH:mm').format('HH:mm');
// const today = moment(new Date()).format('YY/MM/DD');
// const startDate = moment(`${today} 10:00`, 'YY/MM/DD HH:mm').toDate();
// const endDate = moment(startDate).add(1, 'months').toDate();





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
        this.props.events.fetchAll(config.min, config.max, config.startDate, config.endDate, '');
        this.setState({ showModal: false });
    }

    Event = ({ event }) => {
        return (
            <span>
                <strong>
                    {event.title}
                </strong>
                {event.desc.name.slice() && (':  ' + event.desc.name.slice())}
            </span>
        );
    }

    EventWeek = ({ event }) => {
        // console.log(event);
        return <span>
            <em style={{ color: 'magenta' }}>{event.title}</em>
            <p>{event.desc.name.slice()}</p>
        </span>
    }

    EventHeader = (event) => {
        return <span> this is a header </span>;
    }


    eventStyleGetter(event) {
        let backgroundColor;
        // console.log(event);
        switch (event.status) {
            case 'NA':
                backgroundColor = 'red';
                break;
            case 'all free':
                backgroundColor = 'green';
                break;
            case 'partially':
                backgroundColor = 'blue';
                break;
            default:
                backgroundColor = 'gray';
        }

        const style = {
            backgroundColor,
            // display: 'absolute',
            // borderRadius: '5px',
            // margin: 'auto, auto',
            // // marginTop: '5px',
            // // marginBottom: '5px',
            // opacity: 1,
            // color: 'black',
            // border: '2px',
            // left: '10px',
            width: '95%',
            // height: '90%',

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

    modalStyle = {
        content: {
            // position: 'absolute',
            // top: '140px',
            // left: '140px',
            // right: '40px',
            // bottom: '140px',
            // border: '1px solid #ccc',
            // background: '#fff',
            // overflow: 'auto',
            // WebkitOverflowScrolling: 'touch',
            // borderRadius: '4px',
            // outline: 'none',
            // padding: '20px',
            // zindex: '1',
        },
        // overlay: {
        //     position: 'fixed',
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     backgroundColor: 'rgba(0, 0, 0, 0.75)'
        // },
    }


    modalInfo = {
        dates: '',
        doctors: [],
        speciality: [],
    };

    onSelect = (e) => {
        if (e.title !== 'NA') {
            this.modalInfo = {
                dates: {
                    start: moment(e.start).format('YY/MM/DD HH:mm'),
                    end: moment(e.end).format('YY/MM/DD HH:mm'),
                },
                doctors: (e.desc.name.slice().indexOf('NA') !== -1) ? null : e.desc.name.slice(),
                specaility: (e.desc.name.slice().indexOf('NA') !== -1) ? null : e.desc.speciality.slice(),
            };

            this.setState({
                showModal: true,
            });
        } else {
            console.log('нашел NA');
        }
    }

    getCoords = (event) => {
        const e = event.nativeEvent;

        let rect;
        // Перебираем массив родительских эелементов чтобы найти div если
        // пользователь тыкнул на p или em
        e.path.some((el) => {
            if (el.nodeName === 'DIV') {
                rect = el.getBoundingClientRect();
                return true;
            }
        });
        const someSpace = 80;
        // пихаем координаты в стиль модального окна
        this.modalStyle.content = {
            top: rect.top - someSpace / 2 + 'px',
            bottom: window.innerHeight - rect.bottom - someSpace + 'px',
            left: rect.left - someSpace + 'px',
            right: window.innerWidth - rect.right - 2 * someSpace + 'px',
        };
    }

    render() {
        return (

            <div className='main' onMouseMove={this.getCoords}>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    style={this.modalStyle}
                >
                    {/*{this.modalContent()}*/}
                    <ModalContent key='modal' info={this.modalInfo} close={this.handleCloseModal} />

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
        );
    }
}

export default Test;
