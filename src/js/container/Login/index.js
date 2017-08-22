import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { CityHeader,LoginComponent } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            checking: true
        }
    }
    render() {
        const params = this.props.params;
        
        return (
            <div>
                <CityHeader title="登录"/>
                <LoginComponent loginHandle={this.loginHandle}/>
            </div>
        )
    }

    loginHandle(){

    }

    componentDidMount(){
        // console.log('componentDidMount');
        this.doCheck();
    }

    doCheck = () =>{
        const userinfo = this.props.userinfo;
        if(userinfo.username){
            // 已经登录，则跳转到用户主页
            this.goUserPage();
        }else{
            // 未登录，则验证结束
            this.setState({
                checking: false
            })
            // alert('你未登录,请先登录。');
        }
    }

    loginHandle = (username) => {
        console.log(username);
        let userinfo = this.props.userinfo;
        userinfo.username = username;

        const actions =  this.props.userInfoActions;
        actions.update(userinfo);

        const params = this.props.params
        const router = params.router

        console.log(router);

        if(router){
            browserHistory.push(router);     
        }else{
            browserHistory.push('/');     
        }
    }

    goUserPage = () => {
        browserHistory.push('/user');
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
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)