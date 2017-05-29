import React, { Component } from 'react'

import {Footer,Content,Header,HomeHeader } from '../../components/index.js'


export default class Home extends Component {

  render() {


    return (
      <div className="box">

		<HomeHeader />

        <Content />

        <Footer />

      </div>
    )
  }
}
