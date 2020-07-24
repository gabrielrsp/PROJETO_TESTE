import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Users from './pages/Users';
import Cadastro from './pages/Cadastro';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/cadastro" exact component={Cadastro} />
      </Switch>
    </BrowserRouter>
  )

}
