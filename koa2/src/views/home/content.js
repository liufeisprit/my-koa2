import React , {Component} from 'react'
import {
    Row,Col,Card,Badge,Icon, Modal,Spin
} from 'antd'
import {Link} from 'react-router-dom'
const Meta=Card.Meta
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const site = 'http://puzvb5scj.bkt.clouddn.com/'
export default class Content extends Component {
    state={visible:false}
    _handelCancel=(e)=>{
        this.setState({
            visible:false
        })
    }
    _handelClose=(e)=>{
        if(this.player&&this.player.pause){
            this.player.pause()
        }
    }
    _jumpToDetail=()=>{
        const {url}=this.props;
        // url&&window.open(url)
    }
    _showModal=(movie)=>{
        this.setState({
            visible:true
        })
        const video=site+movie.videoKey
        const pic=site+movie.coverKey
        if(!this.player){
            setTimeout(()=>{
                this.player=new DPlayer({
                    container: document.getElementsByClassName('videoModal')[0],
                    screenshot: true,
                    autoplay: true,
                    video: {
                        url: video,
                        pic: pic,
                        thumbnails: pic
                    }
                })
            },500)
        }else{
            if (this.player.video.currentSrc !== video) {
                this.player.switchVideo({
                  url: video,
                  autoplay: true,
                  pic: pic,
                  type: 'auto'
                })
              }
        
              this.player.play()
        }
    }
    _renderContent(){
        const {movies}=this.props;
        return (
            <div style={{padding:'30px'}}>
                <Row>
                    {
                        movies.map((it,index)=>(
                            <Col
                                key={index}
                                xl={{span:6}}
                                lg={{span:8}}
                                md={{span:12}}
                                sm={{span:24}}
                                style={{marginBottom:8}}
                            >
                                <Card
                                    bordered={false}
                                    hoverable
                                    style={{width:'100%'}}
                                    actions={[
                                        <Badge>
                                            <Icon type="clock-circle" style={{marginRight:2}}/>
                                            {moment(it.meta.createdAt).fromNow(true)}前更新
                                        </Badge>,
                                        <Badge>
                                        <Icon type="star" style={{marginRight:2}}/>
                                        {it.rate}分
                                    </Badge>
                                    ]}
                                    cover={<img 
                                        onClick={()=>this._showModal(it)}
                                        src={site+it.posterKey+'?imageMogr2/thumbnail/x1680/gravity/NorthWest/crop/1080x1600/blur/1x0/quality/75'}/>
                                    // cover={<img src={it.poster}/>
                                }
                                >
                                    <Meta 
                                        style={{height:'202px',overflow:'hidden',}}
                                        title={
                                            <Link to={`/detail/${it._id}`}>{it.title}</Link>
                                        } 
                                        onClick={this._jumpToDetail}
                                        description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                                    >
                                        
                                    </Meta>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Modal
                    className='videoModal'
                    visible={this.state.visible}
                    footer={null}
                    afterClose={this._handelClose}
                    onCancel={this._handelCancel}
                >
                    <Spin size='large'></Spin>
                </Modal>
            </div>
        )
    }
    render() {
        return (
            <div style={{padding:10}}>
                {this._renderContent()}
            </div>
        )
    }
}