import React , {Component} from 'react'
import {
    Row,Col,Card,Badge,Icon,
} from 'antd'
import {Link} from 'react-router-dom'
const Meta=Card.Meta
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const site = 'http://video.iblack7.com/'
export default class Content extends Component {
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
                                    action={[
                                        <Badge>
                                            <Icon type="clock-circle" style={{marginRight:2}}/>
                                            {moment(it.meta.creatddAt).fromNow(true)}前更新
                                        </Badge>,
                                        <Badge>
                                        <Icon type="star" style={{marginRight:2}}/>
                                        {it.rate}分
                                    </Badge>
                                    ]}
                                    // cover={<img src={site+it.posterKey+'?imageMongr2/thumbnail/x1680/crop/1080x1600'}/>
                                    cover={<img src={it.poster}/>
                                }
                                >
                                    <Meta 
                                        style={{height:'202px',overflow:'hidden',}}
                                        title={
                                            <Link to={`/detail/${it._id}`}>{it.title}</Link>
                                        } 
                                        description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>}
                                    >
                                        
                                    </Meta>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
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