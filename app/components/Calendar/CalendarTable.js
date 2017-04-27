import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import React from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';

import ModalContent from './ModalContent';
import Spinner from 'components/Spinner';

import config from './calendarConfig';

import styles from './Calendar.sass';
import './Calendar.less';

moment.locale('ru');
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


@observer(['doctors'])
class CalendarTable extends React.Component {

    componentWillMount() {
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
            <em style={{ color: '#2cdad3' }}>{event.title}</em>
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

            if (date < moment()) {
                return <button className={`${styles.navButton} pure-button pure-button-disabled`}>&#8249;</button>;
            }
            return <button className={`${styles.navButton} pure-button pure-button-primary`} onClick={goToBack}>&#8249;</button>;
        };

        const nextButton = () => {
            if (date > moment().add(14, 'd')) {
                return <button className='pure-button pure-button-disabled'>&#8250;</button>;
            }
            return <button className='pure-button pure-button-primary' onClick={goToNext}>&#8250;</button>;
        };

        return (
            <div className={['toolbar-container']}>
                <div className={['back-next-buttons']}>
                    {prevButton()}
                    {nextButton()}
                    <div>
                        <button className={`${styles.todayNavButton} pure-button pure-button-primary`} onClick={goToCurrent}>Сегодня</button>
                    </div>
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
        const someSpace = 90;
        // пихаем координаты в стиль модального окна
        this.modalStyle.content = {
            top: rect.top - someSpace / 2 + 'px',
            bottom: window.innerHeight - rect.bottom - someSpace + 'px',
            left: rect.left - someSpace + 'px',
            right: window.innerWidth - rect.right - 2 * someSpace + 'px',
        };
    }

    render() {
        if (this.props.doctors.isLoading) {
            return <Spinner />;
        }

        return (
            <div className={styles.calendarTable} onMouseMove={this.getCoords}>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className={styles.Modal}
                    overlayClassName={styles.Overlay}
                    style={this.modalStyle}
                >
                    <ModalContent key='modal' info={this.modalInfo} close={this.handleCloseModal} />
                </Modal>
                <BigCalendar
                    onSelectEvent={this.onSelect}
                    events={this.props.doctors.dates.slice()}
                    views={['week']}
                    min={moment(config.min, 'HH:mm').toDate()}
                    max={moment(config.max, 'HH:mm').toDate()}
                    defaultDate={new Date()}
                    defaultView='week'
                    formats={config.formats}
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

export default CalendarTable;
