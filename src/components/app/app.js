import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import ShoppingCartTable from '../shopping-cart-table';
import { withBookstoreService } from '../hoc';
import { HomePage, CartPage } from '../pages';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210} />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/cart" component={CartPage} />
      </Switch>
      <ShoppingCartTable />
    </main>
  )
}

export default withBookstoreService()(App);
