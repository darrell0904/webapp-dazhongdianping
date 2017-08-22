import React , { Component }from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { CityHeader,CurrentCity,CityList } from '../../components'

import LocalStore from '../../util/localStorage'
import { CITYNAME } from '../../config/localStoreKey'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { browserHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 


class City extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <CityHeader title='选择城市'/>
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }

    changeCity(newcity){
        
        const userInfo = this.props.userinfo;
        // console.log(userInfo);
        userInfo.cityName = newcity;

        this.props.userInfoActions.update(userInfo);

        LocalStore.setItem(CITYNAME,newcity);
        
        browserHistory.push('/');
        
    }
}
 
// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)
