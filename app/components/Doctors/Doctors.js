import React from 'react';
import { observer } from 'mobx-react';
import Spinner from 'components/Spinner';

import styles from './Doctors.sass';

@observer(['doctors'])
class Doctors extends React.Component {
    componentWillMount() {
        this.props.doctors.fetchAll();
    }

    detailInfo(e) {
        // e.preventDefault();
        console.log('click');
        console.log(e);
    }

    render() {
        const { selectedDocs, isLoading } = this.props.doctors;

        if (isLoading) {
            return <Spinner />;
        }

        return (
            <div className={styles.main}>
                <p> Наши доктора: </p>
                <ul>
                    {selectedDocs.map(el =>
                        <li key={el.name}>
                            <button onClick={this.detailInfo(el.id)}>
                                {el.name}
                            </button>
                        </li>
                    )}

                </ul>
                the Doctors will go here
            </div>
        );
    }
}

export default Doctors;
