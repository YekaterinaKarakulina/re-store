import React from 'react';
import { withBookstoreService } from '../hoc';

const App = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks());
  return (
    <h1>App</h1>
  )
}

export default withBookstoreService()(App);
