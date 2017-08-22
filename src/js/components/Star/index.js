import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { browserHistory } from 'react-router'

import './index.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            star: 0
        }
    }
    render() {
        // 获取 star 数量，并取余5（最多5个star）
        let star = this.state.star || 0;
        
        return (
            <div className="star-container">
                {[1, 2, 3, 4, 5].map((item, index) => {
                    const lightClass = star >= item ? ' light' : ''
                    return <i key={index} className={'icon-star' + lightClass} onClick={this.clickHandle.bind(this, item)}></i>
                })}
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            star: this.props.star
        })
    }

    clickHandle(star) {
        const clickCallback = this.props.clickCallback

        // console.log(star);
        if (!clickCallback) {
            return
        }

        this.setState({
            star: star
        })

        clickCallback(star)
    }
}

export default SearchHeader