import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
  App,
  Home,
  NotFoundPage
} from './container'

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Home}/> 
    
    <Route path="*" component={NotFoundPage}/>
  </Route>
);