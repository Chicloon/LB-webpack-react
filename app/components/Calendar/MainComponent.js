import React from 'react';
import { observer } from 'mobx-react';

import CalendarTable from './CalendarTable';
import CalendarHeader from './CalendarHeader';

import styles from './Calendar.sass';

@observer(['events'])
class Calendar extends React.Component {
    componentWillMount() {
        this.props.events.fetchAll();
    }

    render() {
        return (
            <div className={styles.calendarMain}>
                <CalendarHeader />
                <CalendarTable />
            </div>
        );
    }
}

export default Calendar;
