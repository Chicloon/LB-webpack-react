import React from 'react';
import { observer } from 'mobx-react';

@observer(['contacts'])
class Show extends React.Component {
  componentWillMount() {
    const contact = this.props.contacts.find(this.props.params.contactId);
    this.setState({ contact });
  }

  render() {
    return (
      <div id='Show'>
        <h1>`{this.state.contact.first_name} {this.state.contact.first_name}`</h1>
        <h2>{this.state.contact.email}</h2>
      </div>
    );
  }
}

export default Show;
