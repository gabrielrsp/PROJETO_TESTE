import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Clientes from './pages/Clientes';
import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/clientes" exact component={Clientes} />
      </Switch>
    </BrowserRouter>
  )

}
