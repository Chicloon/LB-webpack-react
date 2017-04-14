import React from 'react';
import { observer } from 'mobx-react';

import CalendarTable from './CalendarTable';
import CalendarHeader from './CalendarHeader';

import config from './calendarConfig';

@observer(['events'])
class Calendar extends React.Component {
    render() {
        return (
            <div className='calendar-main'>
                <CalendarHeader />
                <CalendarTable />
            </div>
        );
    }
}

export default Calendar;
