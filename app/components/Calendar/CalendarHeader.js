import React from 'react';
import { observer } from 'mobx-react';

import styles from './Calendar.sass';

@observer(['events'])
class CalendarHeader extends React.Component {
    specs = [];
    searchFields = {
        name: '',
        spec: '',
    }

    // setFilterValue = () => {
    //     console.log('setFilterValue');
    //     // this.setState({
    //     //     specs: (this.refs.name.value !== '') ?
    //     //         this.props.events.doctors.filter(el => el.name === this.refs.name.value)[0].spec
    //     //         : this.specs,
    //     // });

    //     // console.log('specs', specs);
    //     // console.log('state', this.state.specs);
    //     this.searchFields = {
    //         name: (this.refs.spec.value === this.searchFields.spec) ? this.refs.name.value : '',
    //         spec: this.refs.spec.value,
    //     };

    //     this.props.events.setFilterDoctors(this.searchFields);
    //     this.props.events.fetchAll();
    // }

    namesList = () =>
        <ul ref='nameList'>
            <li key='anyname'> <button onClick={this.setFilterNameValue} value=''> Все </button> </li>
            {this.props.events.namesList.map(doc =>
                <li key={doc.name}>
                    <button onClick={this.setFilterNameValue} value={doc.name}> {doc.name} </button>
                </li>
            )}
        </ul>;


    setFilterNameValue = (e) => {
        const target = e.target;

        this.refs.nameList.childNodes.forEach((el) =>
            el.firstElementChild.className = styles.inactiveButton
        );
        target.className = styles.activeButton;

        if (this.searchFields.name !== target.value) {
            this.searchFields.name = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
        }
    }


    specsList = () => {
        console.log('specsList');
        this.specs.length === 0 && this.props.events.selectedDocs.map(doc =>
            this.specs.indexOf(doc.spec) === -1 && this.specs.push(doc.spec)
        );

        return (
            <ul ref='specList' className={styles.headerList}>
                <li key='any'> <button onClick={this.setFilterSpecValue} value=''> Все специальности </button> </li>
                {this.specs.map(spec =>
                    <li key={spec}>
                        <button onClick={this.setFilterSpecValue} value={spec}> {spec} </button>
                    </li>
                )}
            </ul>
        );
    }

    setFilterSpecValue = (e) => {
        const target = e.target;

        this.refs.specList.childNodes.forEach((el) =>
            el.firstElementChild.className = styles.inactiveButton
        );
        target.className = styles.activeButton;
        if (this.searchFields.spec !== target.value) {
            this.searchFields.spec = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
        }
    }


    selectedDoctor = () =>
        <div>
            Вы выбрали врача: {this.searchFields.name ?
                this.searchFields.name : 'Не выбрано'}
            <br />
            Специальность врача: {this.searchFields.name ?
                this.props.events.selectedDocs[0].spec : this.searchFields.spec}
            <hr />
        </div>;

    render() {
        return (
            <div>
                <fieldset>
                    <legend>Выберете врача</legend>
                    {this.searchFields.spec !== '' || this.searchFields.name !== '' ?
                        this.selectedDoctor() : ''}
                    <div className="pure-u-12-24">
                        <fieldset>
                            <legend>Специальность</legend>
                            {this.specsList()}
                        </fieldset>
                    </div>
                    <div className="pure-u-12-24">
                        <fieldset >
                            <legend>Имя</legend>
                            {this.namesList()}
                        </fieldset>
                    </div>
                </fieldset>
            </div >
        );
    }
}

export default CalendarHeader;
