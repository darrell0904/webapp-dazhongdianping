import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle}>加载更多</span>
                }
            </div>
        )
    }

    loadMoreHandle = () => {
        // 执行传输过来的
        console.log('ddddddd');
        // setInterval(this.props.loadMoreFn(),3000);
        // setTimeout("alert('对不起, 要你久候')", 3000 )
        // setTimeout('',3000);
        // this.props.loadMoreFn();
        setTimeout(() => this.props.loadMoreFn(), 1000)
    }




}

export default LoadMore
