import React from 'react';
import moment from 'moment';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import events from './events';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);


const messages = {
    next: "Вперед",
    previous: "Назад",
    today: "Сегодня",
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
};

const style = {
  // marginTop: '3em',
  // margin: '2em'
};

class Dnd extends React.Component {
  constructor(props) {
    super(props)
        this.state = {
      events,
    };

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render() {
    return (
      <div className='main'>
        <p> Тут будет меню и все такое </p>
        <DragAndDropCalendar
          defaultDate={new Date(2015, 1, 1)}
          selectable
          messages={messages}
          min = {moment('10:00', 'HH:mm').toDate()}
          max = {moment('22:00', 'HH:mm').toDate()}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          defaultView='week'
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Dnd);
