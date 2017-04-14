import React from 'react';
import { observer } from 'mobx-react';

@observer(['events'])
class CalendarHeader extends React.Component {
    specs = [];

    componentWillMount() {
        this.props.events.doctors.map(doc =>
            this.specs.indexOf(doc.spec) === -1 && this.specs.push(doc.spec)
        );
    }
    // //     this.setState({
    // //         specs: this.specs,
    //     });
    // }

    getFilteredDocs = (e) => {
        e.preventDefault();
        console.log(this.props.events.getDocs('name', 'spec'));
        this.props.events.getDocs('name', 'spec');
        console.log(e.nativeEvent);
    }

    setFilerValue = () => {
        // this.setState({
        //     specs: (this.refs.name.value !== '') ?
        //         this.props.events.doctors.filter(el => el.name === this.refs.name.value)[0].spec
        //         : this.specs,
        // });

        // console.log('specs', specs);
        // console.log('state', this.state.specs);
        this.props.events.setFilterDoctors({
            name: this.refs.name.value,
            spec: this.refs.spec.value,
        });

        this.props.events.fetchAll();
    }

    namesList = () => {
        // this.props.events.selectedDocs.map(doc =>
        //     this.specs.indexOf(doc.spec) === -1 && this.specs.push(doc.spec)
        // );
        console.log('доки для имен', this.props.events.selectedDocs.slice());
        return (
            <select name="doctors" ref='name' onChange={this.setFilerValue}>       
                <option value='' key='any'> Имя </option>
                {this.props.events.selectedDocs.map(doc =>
                    <option value={doc.name} key={doc.name}> {doc.name} </option>
                )}
            </select>
        );
    }


    render() {
        return (
            <div>
                <fieldset>
                    <legend>Выберете врача</legend>
                    <div className="pure-u-12-24">
                        <fieldset >
                            <legend>Имя</legend>
                            {this.namesList()}                       
                        </fieldset>
                    </div>
                    <div className="pure-u-12-24">
                        <fieldset>
                            <legend>Специальность</legend>
                            <select name="doctors" ref='spec' onChange={this.setFilerValue}>
                                {this.specs.length === 0 }
                                <option value='' key='any'> Любая </option>
                                {this.specs.map(spec =>
                                    <option value={spec} key={spec}> {spec} </option>
                                )}
                            </select>
                        </fieldset>
                    </div>
                </fieldset>
            </div >
        );
    }
}

export default CalendarHeader;
