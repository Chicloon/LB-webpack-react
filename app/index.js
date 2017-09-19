import 'purecss/build/pure.css';

import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory, Route } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider, createNetworkInterface  } from 'react-apollo';
import { Provider } from 'mobx-react';

import routes from './routes';
import stores from './stores';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});

render(
  <ApolloProvider client={client} >
  <Provider {...stores}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
  </ApolloProvider>
  ,
  document.getElementById('app')
);
