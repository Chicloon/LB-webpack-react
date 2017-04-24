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

        if (this.searchFields.name !== target.value) {
            this.searchFields.name = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
            this.updateButtons(target, '');
        }
    }

    specsList = () => {
        // Заполняем все специализации врачей в отдельный массив, чтобы построить список специальностей
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

        if (this.searchFields.spec !== target.value) {
            this.searchFields.spec = target.value;
            this.props.events.setFilterDoctors(this.searchFields);
            this.props.events.fetchAll();
            this.updateButtons('', target);
        }
    }

    // Выводим выбранного врача и его специализацию
    selectedDoctor = () =>
        <div>
            Вы выбрали врача: {this.searchFields.name ?
                this.searchFields.name : 'Не выбранно'}
            <br />
            Специальность врача: {this.searchFields.name ?
                this.props.events.selectedDocs[0].spec : this.searchFields.spec}            
        </div>;

    // Меняем классы кнопок в зависимости от действия пользователя
    updateButtons = (name, spec) => {
        if (spec) {
            this.searchFields.name = '';
            // дейлаем кнопку "все" в списке имен активной и выключаем остальные
            this.refs.nameList.childNodes.forEach(el =>
                el.children[0].className = 'pure-button pure-button-secondary'
            );
            this.refs.nameList.childNodes[0].children[0].className = 'pure-button pure-button-primary';

            // включаем текущую кнопку специальности, выключаем остальные
            this.refs.specList.childNodes.forEach((el) =>
                el.firstElementChild.className = 'pure-button pure-button-secondary'
            );
            spec.className = 'pure-button pure-button-primary';
        }

        if (name) {
            // включаем активное имя вкача, выключаем остальные
            this.refs.nameList.childNodes.forEach((el) =>
                el.firstElementChild.className = 'pure-button pure-button-secondary'
            );
            name.className = 'pure-button pure-button-primary';
        }
    }

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
                </fieldset>
            </div >
        );
    }
}

export default CalendarHeader;
