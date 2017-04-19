import React from 'react';
import { observer } from 'mobx-react';

import CalendarTable from './CalendarTable';
import CalendarHeader from './CalendarHeader';


@observer(['events'])
class Calendar extends React.Component {
    componentWillMount() {
        this.props.events.fetchAll();
    }

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
