import React, { Component } from 'react'
import routes from '../routes'
import { Router } from 'react-router'

// const route = {routes}

export default class Root extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router history={history} routes={routes} />
    )
  }
}
