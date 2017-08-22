import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Footer,Content,Header,HomeHeader,Category } from '../../components/index.js'

import Ad from './subpage/Ad';
import List from './subpage/List';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


class Home extends Component {

  constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    
    return (
      <div className="box">
      		  <HomeHeader cityName={this.props.userinfo.cityName}/>

      		  <Category />

      		  <div style={{height: '15px'}}>{/* 分割线 */}</div>
          
            <Ad />

            <List cityName={this.props.userinfo.cityName}/>
      </div>
    )
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
