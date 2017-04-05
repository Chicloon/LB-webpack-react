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


    modalInfo = {};

    onSelect = (e) => {
        console.log(e);
        console.log(e.desc.slice());

        if (e.desc.slice().indexOf('NA') !== -1) {
            console.log('нашел NA');
        }
        this.modalInfo = {
            dates: `${moment(e.start).format('MM/DD HH:mm')} 
                - ${moment(e.end).format('MM/DD HH:mm')}`,
            doctors: (e.desc.slice().indexOf('NA') !== -1) ? null : e.desc.slice(),
        };

        this.setState({
            showModal: true,
        });
        // const top = this.coords.mouseY - 32;
        // // const bottom = top + 100;
        // console.log(this.coords);
        // console.log('x', this.state.x);
        // this.modalStyle.content = this.coords;
        console.log(this.modalStyle.content);
        // this.modalStyle = {
        //     content: {
        //         top,
        //         // bottom,
        //     },
        // };
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
        const someSpace = 50;
        // пихаем координаты в стиль модального окна
        this.modalStyle.content = {
            top: rect.top - someSpace + 'px',
            bottom: window.innerHeight - rect.bottom - someSpace + 'px',
            left: rect.left - someSpace + 'px',
            right: window.innerWidth - rect.right - 2 * someSpace + 'px',
        };
    }

    test = (event) => {
        const e = event.nativeEvent;
        console.log(e);
        const div = [];
        e.path.some((el) => {
            if (el.nodeName === 'DIV') {
                console.log('found div');
                div.push(el);
                return true;
            }
        });
        console.log(e.path[0].nodeName);
        console.log(div);
    }

    modalContent = () => {
        return (
            <div>
                <button onClick={this.handleCloseModal} className="closeModal">X</button>
                {this.modalInfo.doctors ? <div>
                    <p> Выберете врача </p>
                    <form action="" className="">
                        <select name="doctors">
                            {this.modalInfo.doctors ? console.log(this.modalInfo.doctors) : ''}
                            {this.modalInfo.doctors ? this.modalInfo.doctors.map(doc => {
                                console.log(doc);
                                return <option value={doc} key={doc}>{doc} </option>;

                            })
                                : ''}

                        </select>
                        {/*<input type="submit" className=""> Выбрать врача </input>*/}
                    </form> </div> : <p> Запись на это время не возможна </p>}


                <p>Modal {this.modalInfo.dates} text!</p>
                <p> {this.modalInfo.doctors} adsfasd </p>
            </div>
        );
    }

    render() {
        return (

            <div className='main' onMouseMove={this.getCoords} onClick={this.test}>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    style={this.modalStyle}
                >
                    {this.modalContent()}

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
