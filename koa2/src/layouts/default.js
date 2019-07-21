import React,{Component} from 'react'
import {Menu,Spin} from 'antd'

import navRoutes from './nav'
const getMenuContent=({path,name})=>(
    <a href={path?path:'/'} style={{color:'#fff2e8'}}>
        {name}
    </a>
)
export default class Layout extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            tip:'再等一下下嘛'
        }
    }
    componentDidMount() {
        window.__LOADING__= this.toggleLoading
    }
    componentWillMount() {
        window.__LOADING__= null
    }
    matchRouteName=this.props.match
    ? navRoutes.find(e=>e.name===this.props.match.params.type)
    ?  navRoutes.find(e=>e.name===this.props.match.params.type).name
    : '全部'
    : navRoutes[0].name
    toggleLoading = (status=false,tip='再等一下下嘛!')=>{
        this.setState({
            loading:status,
            tip,
        })
    }
    render() {
        const {children}=this.props;
        const {loading , tip}=this.state;
        return (
            <div className='flex-form' style={{width:'100%',height:'100%'}}>
                <Menu
                    mode='horizontal'
                    style={{fontSize:12.5,backgroundColor:'#000'}}
                    defaultSelectedKeys={[this.matchRouteName]}
                >
                    <Menu.Item 
                        style={{
                            marginLeft:24,
                            marginRight:30,
                            fontSize:18,
                            textAlign:'center',
                            color:'#fff !important',
                            float:'left'
                        }}
                    >
                        <a href={'/'} className='hover-scale logo-text' style={{
                            color:'#fff2e8'
                        }}>预告片</a>
                     </Menu.Item>
                    {
                        navRoutes.map((e,i)=>(
                            <Menu.Item key={e.name}>
                            {
                                getMenuContent({...e})
                            }
                            </Menu.Item>
                        ))
                    }
                </Menu>
                <Spin
                    spinning={loading}
                    tip={tip}
                    wrapperClassName='content-spin full'
                >
                    {children}
                </Spin>
                
            </div>
        )
    }
}