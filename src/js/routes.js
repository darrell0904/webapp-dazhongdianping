import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
  App,
  Home,
  City,
  Search,
  Detail,
  Login,
  User,
  NotFoundPage
} from './container'

export default (
  <Route path="/" component={App}> 
    <IndexRoute component={Home}/> 
    <Route path="/city" component={City}/>
    <Route path='/search/:category(/:keyword)' component={Search}/>
    <Route path='/detail/:id' component={Detail}/>
    <Route path='/login(/:router)' component={Login}/>
    <Route path='/user' component={User}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);