import React from 'react';
import { observer } from 'mobx-react';
import Spinner from 'components/Spinner';
import DoctorDetails from './DoctorDetails';


import styles from './Doctors.sass';

@observer(['doctors'])
class Doctors extends React.Component {
    componentWillMount() {
        this.props.doctors.fetchAll();
    }

    render() {
        const { selectedDocs, isLoading } = this.props.doctors;

        if (isLoading) {
            return <Spinner />;
        }

        return (
            <div className={styles.main}>
                <h2> Наши доктора </h2>
                {selectedDocs.map(el => <DoctorDetails key={el.id} doctor={el} />)}
            </div>
        );
    }
}

export default Doctors;
