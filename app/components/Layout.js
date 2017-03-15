import React from 'react';

const Layout = props =>
  <div id='Layout'>
    <div className="pure-menu pure-menu-horizontal pure-menu-fixed">
      <a href="#" className="pure-menu-heading">Invoiced</a>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <a href="#" className="pure-menu-item">Sign In</a>
        </li>
      </ul>
    </div>
    {props.children}
  </div>;

export default Layout;
