import React , {Component} from 'react'
import {request} from '../../lib'
import { Tabs, Card, Badge, Radio, Button, message, List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
const site = 'http://puzvb5scj.bkt.clouddn.com/'
const DPlayer = window.DPlayer
const TabPane = Tabs.TabPane
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
function callback(key) {
  console.log(key);
}
export default class MovieDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            loading: false,
            relativeMovies: [],
            _id: this.props.match.params.id,
            movie: null,
            player:null
        }
    }
    componentDidMount(){
      this._getMovieDetail()
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.id!==this.props.match.params.id){
          this.setState({
            _id:nextProps.match.params.id
        },this._getMovieDetail)
      }
    }
    _getMovieDetail=()=>{
        request({
          method: 'get',
          url: `/v0/api/movies/${this.state._id}`
        })
        .then(data => {
          const {movie,relativeMovies} = data
          const video = site + movie.videoKey
          const pic = site + movie.coverKey
          console.log('_getMovieDetail')
          this.setState({
            movie,
            relativeMovies,
          }, () => {
            this.player = new DPlayer({
              container: document.getElementById('videoPlayer'),
              screenshot: true,
              video: {
                url: video,
                pic: pic,
                thumbnails: pic
              }
            })
          })
        })
        .catch(() => {
          console.log('catch')
        //   this.props.history.goBack()
        })
      }
    render(){
        const {movie,relativeMovies}=this.state
        if (!movie) return null;
        return(
            <div className='flex-row full'>
                <div className="page-shade">
                    <div className="video-wrapper">
                        <div id="videoPlayer" src={site + movie.coverKey} data-video={site + movie.videoKey} />
                    </div>
                    <div className="video-sidebar">
                        <Link className='homeLink' to={'/'}>回到首页</Link>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="关于本片" key="1">
                            <h1>{movie.title}</h1>
                            <dl>
                            <dt>豆瓣评分：<Badge count={movie.rate} style={{ backgroundColor: '#52c41a' }} /> 分</dt>
                            <dt>电影分类：{movie.tags && movie.tags.join(' ')}</dt>
                            <dt>更新时间：{moment(movie.meta.createdAt).fromNow()}</dt>
                            <dt>影片介绍：</dt>
                            <dd>{movie.summary}</dd>
                            </dl>
                        </TabPane>
                        <TabPane tab="同类电影" key="2">
                            {
                            relativeMovies.map(item => (
                                <Link key={item._id} className="media" to={`/detail/${item._id}`}>
                                <img width="60" className="align-self-center mr-3" src={site + item.posterKey} alt={item.rawTitle} />
                                <div className="media-body">
                                    <h6 className="media-title">{item.title}</h6>
                                    <ul className="list-unstyled">
                                    {
                                        item.pubdate && item.pubdate.map((it, i) => (
                                        <li key={i}>{moment(it.date).format('YYYY.MM')} ({it.country})</li>
                                        ))
                                    }
                                    </ul>
                                </div>
                                </Link>
                            ))
                            }
                        </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
    
}