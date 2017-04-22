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
            <li key='anyname'> <button className='pure-button pure-button-primary' onClick={this.setFilterNameValue} value=''> Все </button> </li>
            {this.props.events.namesList.map(doc =>
                <li key={doc.name}>
                    <button className='pure-button pure-button-secondary' onClick={this.setFilterNameValue} value={doc.name}> {doc.name} </button>
                </li>
            )}
        </ul>;


    setFilterNameValue = (e) => {
        const target = e.target;


        // const specList = this.refs.specList.childNodes;


        // console.log(this.props.events.selectedDocs[0].spec);
        // const spec = specList.filter(el => el.children[0].value === this.props.events.selectedDocs[0].spec);
        // console.log('spec is', spec);
        // specList.forEach((el) => {

        //     console.log(el.children[0].value);
        //     console.log(this.props.events.selectedDocs[0].spec);
        //     console.log(el.children[0].value === this.props.events.selectedDocs[0].spec);
        //     if (el.children[0].value === this.props.events.selectedDocs[0].spec) {
        //         el.children[0].className = 'pure-button pure-button-primary';
        //     } else {
        //         el.children[0].className = 'pure-button pure-button-secondary';
        //     }
        // }

        // );


        this.refs.nameList.childNodes.forEach((el) =>
            el.firstElementChild.className = 'pure-button pure-button-secondary'
        );
        target.className = 'pure-button pure-button-primary';


        // Ставим активную кномку "Все" если выбраны все врачи
        if (target.value === '') {

            this.refs.specList.childNodes.forEach(el =>
                el.children[0].className = 'pure-button pure-button-secondary'
            );
            this.refs.specList.childNodes[0].children[0].className = 'pure-button pure-button-primary';
        }

        if (this.searchFields.name !== target.value) {
            this.searchFields.name = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
        }
    }


    specsList = () => {


        // console.log('Специальность дока', this.searchFields.spec);
        this.specs.length === 0 && this.props.events.selectedDocs.map(doc =>
            this.specs.indexOf(doc.spec) === -1 && this.specs.push(doc.spec)
        );

        return (
            <ul ref='specList'>
                <li key='any'> <button className='pure-button pure-button-primary' onClick={this.setFilterSpecValue} value=''> Все </button> </li>
                {this.specs.map(spec =>
                    <li key={spec}>
                        <button className='pure-button pure-button-secondary' onClick={this.setFilterSpecValue} value={spec}> {spec} </button>
                    </li>
                )}
            </ul>
        );
    }

    setFilterSpecValue = (e) => {
        const target = e.target;

        this.refs.specList.childNodes.forEach((el) =>
            el.firstElementChild.className = 'pure-button pure-button-secondary'
        );
        target.className = 'pure-button pure-button-primary';
        if (this.searchFields.spec !== target.value) {
            this.searchFields.spec = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
        }
    }

    changeClass = () => {
        const specList = this.refs.specList.childNodes;


        // console.log(this.props.events.selectedDocs[0].spec);
        // const spec = specList.filter(el => el.children[0].value === this.props.events.selectedDocs[0].spec);
        // console.log('spec is', spec);
        specList.forEach((el) => {

            if (el.children[0].value === this.props.events.selectedDocs[0].spec) {
                el.children[0].className = 'pure-button pure-button-primary';
            } else {
                el.children[0].className = 'pure-button pure-button-secondary';
            }
        }

        );
    }

    selectedDoctor = () =>
        <div>
            Вы выбрали врача: {this.searchFields.name ?
                this.searchFields.name : 'Все врачи'}
            <br />
            Специальность врача: {this.searchFields.name ?
                this.props.events.selectedDocs[0].spec : this.searchFields.spec}
            <hr />
        </div>;

    render() {
        return (
            <div >
                <fieldset className={styles.mainFieldset}>
                    <legend>Выберете врача</legend>

                    <div className="pure-u-12-24" >
                        <fieldset className={styles.fieldset}>
                            <legend>Специальность</legend>
                            {this.specsList()}
                        </fieldset >
                    </div>
                    <div className="pure-u-12-24">
                        <fieldset className={styles.fieldset}>
                            <legend>Имя</legend>
                            {this.namesList()}
                        </fieldset>
                    </div>
                    {this.searchFields.spec !== '' || this.searchFields.name !== '' ?
                        this.selectedDoctor() : ''}
                    {this.searchFields.spec !== '' || this.searchFields.name !== '' ? this.changeClass() : ''}
                </fieldset>
            </div >
        );
    }
}

export default CalendarHeader;
