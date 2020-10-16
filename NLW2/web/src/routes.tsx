import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './pages/CreateOrphanage';

import Landing from './pages/landing';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/orphanages" exact component={OrphanagesMap}/>
        
        <Route path="/orphanages/create" component={CreateOrphanage}/>
        <Route path="/orphanages/:id" exact component={Orphanage}/>
      </Switch>
    </BrowserRouter>
  );
}
