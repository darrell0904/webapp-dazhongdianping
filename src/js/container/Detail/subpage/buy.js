import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import * as storeActionsFromOtherFile from '../../../actions/store' 

import { BuyAndStore } from '../../../components'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} />
        )
    }

    componentDidMount(){
        // 验证当前商户是否收藏
        this.checkStoreState()
    }

    checkStoreState(){
        let id = this.props.id;
        const store = this.props.store
        
        store.map((item,index) => {
            if(id === item.id){
                this.setState({isStore: true});
            }
        })
    }

    // 检查登录状态
    loginCheck() {
        let id = this.props.id;
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            // 跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            browserHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false;
            // alert('请登陆');
        }
        return true
    }

    // 购买事件
    buyHandle(){
        // 验证登录，未登录则retur
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return;
        }

        // 此过程为模拟购买，因此可省去复杂的购买过程

        // 跳转到用户主页
        browserHistory.push('/user')
    }
    
    // 收藏事件
    storeHandle(){
        // 验证登录，未登录则retur
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return;
        }

        const id = this.props.id
        const storeActions = this.props.storeActions

        if(this.state.isStore){
            // 已经被收藏了，则取消收藏
            storeActions.rm({id:id})
        }else{
            // 未收藏，则添加到收藏中
            storeActions.add({id:id})
        }

        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }

}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo:state.userinfo,
        store:state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromOtherFile, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)