import React,{ Component } from 'react';

import '../static/css/common.css'
import '../static/css/font.css'

export default class App extends Component {
  render() {
    const { children } =this.props;
    return children
  }
}