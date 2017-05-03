import React from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import styles from './Doctors.sass';

@observer(['doctors'])
class DoctorDetails extends React.Component {
    detailInfo = () => {
        console.log(this.props.doctor);
        console.log(this.props.doctor.busy.slice());
    }

    enroll = () =>
        this.props.doctors.setFilterDoctors({
            name: this.props.doctor.name,
            spec: this.props.doctors.spec,
        });


    render() {
        return (
            <div className={`${styles.doctorInfo} pure-u-1-3`}>
                <h3> Имя: <span className={styles.doctorsFields}> {this.props.doctor.name} </span> </h3>
                <h4> Специальность: <span className={styles.doctorsFields}> {this.props.doctor.spec} </span> </h4>
                <button onClick={this.detailInfo} className={`${styles.doctorsButtons} pure-button pure-button-info`}> Подробнее </button>
                <Link to='/calendar' className={`${styles.doctorsButtons} pure-button pure-button-primary`} onClick={this.enroll}>
                    Записаться
                </Link>
            </div>
        );
    }

}

export default DoctorDetails;
