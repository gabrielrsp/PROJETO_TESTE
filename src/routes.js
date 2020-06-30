import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Users from './pages/Users';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Users} />
      </Switch>
    </BrowserRouter>
  )

}