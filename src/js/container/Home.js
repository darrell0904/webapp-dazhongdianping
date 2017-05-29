import React, { Component } from 'react'

import {Footer,Content,Header } from '../components/index.js'

export default class Home extends Component {

  render() {


    return (
      <div className="box">
        <Header />

        <Content />

        <Footer />

      </div>
    )
  }
}
