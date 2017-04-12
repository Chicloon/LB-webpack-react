import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';

const min = moment('10:00', 'HH:mm').format('HH:mm');
const max = moment('18:00', 'HH:mm').format('HH:mm');
const today = moment(new Date()).format('YY/MM/DD');
const startDate = moment(`${today} 10:00`, 'YY/MM/DD HH:mm').toDate();
const endDate = moment(startDate).add(1, 'months').toDate();


@observer(['events'])
class ModalContent extends React.Component {
    componentWillMount() {
        this.setState({ showModal: false });
    }


    addNewEvent = (e) => {
        console.log('doctors', this.props.events.doctors);
        e.preventDefault();
        console.log(this.refs.doctor.value);
        this.props.events.addNew(this.refs.doctor.value, this.props.info.dates);
         this.props.events.fetchAll(min, max, startDate, endDate, '');

        this.props.close();
    }

    render() {
        console.log('myprops', this.props);
        return (

            <div>
                <button onClick={this.props.close} className="closeModal">X</button>
                {this.props.info.doctors.length > 0 ?
                    <div>
                        <p> Выберете врача </p>
                        <form action="" className="" onSubmit={this.addNewEvent}>
                            <select name="doctors" ref='doctor'>
                                {this.props.info.doctors ? this.props.info.doctors.map(doc => {
                                    console.log(doc);
                                    return <option value={doc} key={doc}>{doc} </option>;

                                }) : ''}
                            </select>
                            <br />
                            <button type="submit" className="pure-button pure-button-primary">Записаться</button>
                        </form>
                    </div> : <p> Запись на это время не возможна </p>}
                <p>Modal {this.props.info.dates.start} - {this.props.info.dates.end} text!</p>
                <p> {this.props.info.doctors} adsfasd </p>
            </div>
        );

    }
}

export default ModalContent;