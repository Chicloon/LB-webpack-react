import React from 'react';
import { observer } from 'mobx-react';

import { Link } from 'react-router';

import styles from './Contact.sass';

@observer(['contacts'])
class Contact extends React.Component {
  removeContact = (e) => {
    e.preventDefault();
    this.props.contacts.remove(this.props.id);
  }
  patchContact = (e) => {
    e.preventDefault();
    this.props.contacts.patch(this.props.id);
  }

  render() {
    // var urlToChangeStream = 'http://localhost:3000/api/Contacts/change-stream?_format=event-stream';
    // var src = new EventSource(urlToChangeStream);
    // src.onmessage = function (e) {
    //   console.log("Пришли данные: " + e.data);
    // };
    // src.addEventListener('data', function (msg) {
    //   var data = JSON.parse(msg.data);
    //   console.log('the data is', data); // the change object
    // });
    return (
      <div className={`${styles.contact} pure-u-1-3`}>
        <h2>
          <Link to={`/contacts/${this.props.id}`}>
            {this.props.first_name} {this.props.last_name}
          </Link>
        </h2>
        <p>{this.props.email}</p>
        <a href='#'
          className={`${styles.removeButton} pure-button`}
          onClick={this.removeContact}>
          Remove
        </a>
        <a href='#'
          className={`${styles.removeButton} pure-button`}
          onClick={this.patchContact}>
          Patch
        </a>
      </div>
    );
  }
}

export default Contact;
