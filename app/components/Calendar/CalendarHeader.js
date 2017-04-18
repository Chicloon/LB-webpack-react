import React from 'react';
import { observer } from 'mobx-react';

@observer(['events'])
class CalendarHeader extends React.Component {
    specs = [];
    searchFields = {
        name: '',
        spec: '',
    }

    setFilterValue = () => {
        console.log('setFilterValue');
        // this.setState({
        //     specs: (this.refs.name.value !== '') ?
        //         this.props.events.doctors.filter(el => el.name === this.refs.name.value)[0].spec
        //         : this.specs,
        // });

        // console.log('specs', specs);
        // console.log('state', this.state.specs);
        this.searchFields = {
            name: (this.refs.spec.value === this.searchFields.spec) ? this.refs.name.value : '',
            spec: this.refs.spec.value,
        };

        this.props.events.setFilterDoctors(this.searchFields);
        this.props.events.fetchAll();
    }

    namesList = () =>
        <select name="doctors" ref='name' onChange={this.setFilterValue} size='5' multiple>
            {console.log('namesList')}
            <option value='' key='any' > Любое </option>
            {this.props.events.namesList.map(doc =>
                <option value={doc.name} key={doc.name}> {doc.name} </option>
            )}
        </select>;



    selectedDoctor = () =>
        <div>
            Вы выбрали врача: {this.searchFields.name ?
                this.searchFields.name : 'Не выбрано'}
            <br />
            Специальность врача: {this.searchFields.name ?
                this.props.events.selectedDocs[0].spec : this.searchFields.spec}
            <hr />
        </div>;

    specsList = () => {
        console.log('specsList');
        this.specs.length === 0 && this.props.events.selectedDocs.map(doc =>
            this.specs.indexOf(doc.spec) === -1 && this.specs.push(doc.spec)
        );
        return (
            <select name="doctors" ref='spec' onChange={this.setFilterValue}>

                <option value='' key='any'> Любая </option>
                {this.specs.map(spec =>
                    <option value={spec} key={spec}> {spec} </option>
                )}
            </select>
        );
    }

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