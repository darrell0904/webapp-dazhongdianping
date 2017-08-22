import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detail'

import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './index.less'

class Comment extends React.Component {
	constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }

    render(){
    	// console.log(this.state.hasMore);
    	return(
			<div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {	
                	this.state.data.length 
                	? <ListComponent data={this.state.data} />
                	: <div>暂时还没有数据</div>

                }
                {
                	this.state.hasMore
                	? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
                	: <div>没有更多的数据了</div>
                }
            </div>
		)
    }

    componentDidMount() {
        this.loadFirstPageData();
    }
	
	loadFirstPageData(){
		let id = this.props.id;
		let result = getCommentData(0,id);
		this.resultHandle(result);
	}

    loadMoreData() {
    	// 记录状态
        this.setState({
            isLoadingMore: true
        })

        const id = this.props.id;
        const page = this.state.page;
        let result = getCommentData(page,id);
        this.resultHandle(result);

        // 记录状态
        this.setState({
            isLoadingMore: false
        })
	}

    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json();
        }).then(json => {
            // 增加 page 技术
			const page = this.state.page;
			
			this.setState({
				page:page+1,
			})

			const hasMore = json.hasMore;
			const data = json.data;

			this.setState({
				hasMore:hasMore,
				data:this.state.data.concat(data),
			})
			
        }).catch(ex => {
            if (__DEV__) {
                console.error('详情页获取用户评论数据出错, ', ex.message)
            }
        })
    }

}

export default Comment;