import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});
ReactDOM.render(
  
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>,
  document.getElementById('app'),
);
