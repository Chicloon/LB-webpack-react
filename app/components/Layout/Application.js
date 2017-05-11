import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

import styles from './Layout.sass';

@inject('user') @observer
class Application extends React.Component {
  signOut = () => {
    console.log('user signed out');
    this.props.user.signOut();
  }

  checkUser() {
    if (this.props.user.signedIn) {
      return (
        <div>
           
          <Link to="/"
            className={classNames("pure-menu-link", styles.links)}
            onClick={this.signOut}
          > {this.props.user.username}, <b>Sign Out</b>
          </Link>
        </div>
      );
    }

    return (
      <Link to="/users/sign_in"
        className={classNames("pure-menu-link", styles.links)}>Sign In</Link>
    );
  }

  render() {
    return (
      <div id='Layout' className={styles.layout}>
        <div
          className={classNames("pure-menu pure-menu-horizontal pure-menu-fixed", styles.mainNav)}>
          <Link to="/"
            className={classNames("pure-menu-heading", styles.heading)}>Главная</Link>
            <Link to="/doctors"
            className={classNames("pure-menu-heading", styles.heading)}>Врачи</Link>
              <Link to="/contacts"
            className={classNames("pure-menu-heading", styles.heading)}>Contacts</Link>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <Link to="/calendar"
                className={classNames('pure-menu-heading', styles.heading)}>
                Записаться
              </Link>
            </li>

            <li className="pure-menu-item">
              {this.checkUser()}
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}


export default Application;
