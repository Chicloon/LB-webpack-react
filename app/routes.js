import React from 'react';

import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import c from './components';
import NotFound from './NotFound';

console.log(c);
const routes =
  <Route>
    <Route component={c.Layout.Application}>
      <Redirect from='/' to='/home' />
      <Route path='users'>
        <Route path='sign_in' component={c.Sessions.New} />
      </Route>
      <Route path='contacts'>
        <IndexRoute component={c.Contacts.Collection} />
        <Route path=':contactId' component={c.Contacts.Show} />
      </Route>
      <Route path='home' component={c.Home.Home} />
      <Route path='dnd' component={c.Calendar.dnd} />
      <Route path='doctors' component={c.Doctors.Doctors} />
      <Route path='calendar' component={c.Calendar.Calendar} />
      <Route path='test' component={c.Calendar.Test} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>;

export default routes;
