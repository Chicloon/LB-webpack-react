import React from 'react';
import { observer } from 'mobx-react';

import CalendarTable from './CalendarTable';
import CalendarHeader from './CalendarHeader';

import config from './calendarConfig';

@observer(['events'])
class Calendar extends React.Component {
    specs = [];
    componentWillMount() {
        this.props.events.fetchAll();
    }

    render() {
        console.log('specs form main component', this.specs);
        return (
            <div className='calendar-main'>
                <CalendarHeader specs = {this.specs}/>
                <CalendarTable />
            </div>
        );
    }
}

export default Calendar;
