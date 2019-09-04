import React, {Component} from 'react'
import './index.css'

import LikeItem from './LikeItem/index'
import Loading from '../../../../components/Loading'
// const dataSource = [
//     {
//         id: "p-1",
//         shopId: "s-1",
//         shop: "院落创意菜",
//         tag: "免预约",
//         picture:
//             "https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
//         product: "「5店通用」百香果（冷饮）1扎",
//         currentPrice: 19.9,
//         oldPrice: 48,
//         saleDesc: "已售6034"
//     },
//     {
//         id: "p-2",
//         shopId: "s-2",
//         shop: "正一味",
//         tag: "免预约",
//         picture:
//             "https://p0.meituan.net/deal/4d32b2d9704fda15aeb5b4dc1d4852e2328759.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0",
//         product: "[51店通用] 肥牛石锅拌饭+鸡蛋羹1份",
//         currentPrice: 29,
//         oldPrice: 41,
//         saleDesc: "已售15500"
//     },
//     {
//         id: "p-3",
//         shopId: "s-3",
//         shop: "Salud冻酸奶",
//         tag: "免预约",
//         picture:
//             "https://p0.meituan.net/deal/b7935e03809c771e42dfa20784ca6e5228827.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
//         product: "[28店通用] 冻酸奶（小杯）1杯",
//         currentPrice: 20,
//         oldPrice: 25,
//         saleDesc: "已售88719"
//     },
//     {
//         id: "p-4",
//         shopId: "s-4",
//         shop: "吉野家",
//         tag: "免预约",
//         picture:
//             "https://p0.meituan.net/deal/63a28065fa6f3a7e88271d474e1a721d32912.jpg%40180w_180h_1e_1c_1l_80q%7Cwatermark%3D0",
//         product: "吉汁烧鱼+中杯汽水/紫菜蛋花汤1份",
//         currentPrice: 14,
//         oldPrice: 23.5,
//         saleDesc: "已售53548"
//     },
//     {
//         id: "p-5",
//         shopId: "s-5",
//         shop: "醉面 一碗醉香的肉酱面",
//         tag: "免预约",
//         picture:
//             "https://p1.meituan.net/deal/a5d9800b5879d596100bfa40ca631396114262.jpg.webp@180w_180h_1e_1c_1l_80q|watermark=0",
//         product: "[7店通用] 单人套餐",
//         currentPrice: 17.5,
//         oldPrice: 20,
//         saleDesc: "已售23976"
//     }
// ];

class LikeList extends  Component{
    constructor(props) {
        super(props)
        // console.log(props)
        this.myRef = React.createRef();
        this.removeListener = false;
    }
    render() {
        const {data, pageCount} = this.props;
        return (
            <div ref={this.myRef} className="likeList">
                <div className="likeList__header">猜你喜欢</div>
                <div className="likeList__list">
                    {
                        data.map((item, index) => {
                            return <LikeItem key={index} data={item}/>
                        })
                    }
                </div>
                {
                    pageCount < 3 ? (
                        <Loading/>
                    ): (
                        <a href="javascipt:;" className="likeList__viewAll">
                            查看更多
                        </a>
                    )
                }
            </div>
        )
    }
    // 页面加载完
    componentDidMount() {
        if (this.props.pageCount < 3) {
            document.addEventListener("scroll", this.handleScroll);
        } else {
            this.removeListener = false;
        }

        if (this.props.pageCount === 0) {
            this.props.fetchData()
        }
    }
    // 页面更新
    componentDidUpdate() {
        if(this.props.pageCount >=3 && !this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll);
            this.removeListener = true;
        }
    }
    // 卸载
    componentWillUnmount() {
        if(!this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll)
        }
    }
    // 处理屏幕滚动事件，实现加载更多的效果
    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop
            || document.body.scrollTop; // 页面滚动距离

        const screenHeight = document.documentElement.clientHeight; // 屏幕可见高度

        const likeListTop = this.myRef.current.offsetTop; // 顶部距离
        const likeListHeight = this.myRef.current.offsetHeight; // 内容高度

        if(scrollTop >= likeListHeight + likeListTop - screenHeight) { // 判断条件 上拉刷新
            // const newData = this.state.data.concat(dataSource); // 数据拼接
            // const newLoadTimes = this.state.loadTimes + 1; // 累加
            // setTimeout(() => {
            //     this.setState({ // 渲染数据
            //         data: newData,
            //         loadTimes: newLoadTimes
            //     })
            // }, 1000)
            this.props.fetchData()
        }
    }
}
export default LikeList
