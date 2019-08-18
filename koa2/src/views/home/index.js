import React , {Component} from 'react'
import Layout from '../../layouts/default';
import {request} from '../../lib'
import Content from './content'
import {Link} from 'react-router-dom'
import {
    Menu
} from 'antd';
export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            years:['全部','2019','2018','2017','2016','2015','2014','2013','2012'],
            type:new URLSearchParams(this.props.location.search.substring(1)).get('type'),
            year:new URLSearchParams(this.props.location.search.substring(1)).get('year'),
            movies:[],
            selectedKey:'0'
        }
    }
    componentWillReceiveProps(nextProps){
        const {search}=nextProps.location
        console.log(search)
        if(search!=this.props.location.search){
            const type=new URLSearchParams(search.substring(1)).get('type');
            const year=new URLSearchParams(search.substring(1)).get('year');
            this.setState({
                type,year
            },this._getAllMovies)
            
        }
        
    }
    componentDidMount() {
        this._getAllMovies()
    }
    _getAllMovies(){
        request(window.__LOADING__)({
            method:'get',
            url:`/v0/api/movies?type=${this.state.type||''}&year=${this.state.year||''}`
        }).then(res=>{
            this.setState({movies:res})
        }).catch(()=>{
            this.setState({movies:[]})
        })
    }
    _renderContent(){
        const {movies}=this.state
        if(!movies||!movies.length){return null}
        return <Content movies={movies}/>
    }
    _selectItem({key}){
        // this.setState({
        //     selectedKey:key
        // })
        // console.log(this)
    }
    _selectItemTypeClick({type,year}){
        console.log(type,year)
        console.log(this)
        const {search}=this.props.location
        type=type||'';
        year=year||''
        // if(type&&this.state.year){
        //     year=this.state.year
        // }
        // if(year&&this.state.type){
        //     type=this.state.type
        // }
        this.props.history.push(`/?type=${type||this.state.type}&year=${year||this.state.year}`)
        
    }
    render(){
        const {years,selectedKey}=this.state
        return(
            <Layout {...this.props} _selectItemTypeClick={this._selectItemTypeClick.bind(this)}>
                <div className='flex-row full'>
                    <Menu
                        defaultSelectedKeys={[selectedKey]}
                        mode='inline'
                        style={{height:'100%',overflowY:'scroll',maxWidth:230}}
                        onSelect={this._selectItem}
                        className='align-self-start'
                    >
                        {
                            years && years.length?
                            years.map((e,i)=>(
                                <Menu.Item key={i}>
                                    <a href='javascript:;' onClick={()=>this._selectItemTypeClick({year:e})}>{e}年上映</a>
                                    
                                </Menu.Item>
                            )):
                            null
                        }
                    </Menu>
                    <div className='flex-1 scroll-y align-self-start'>
                        {this._renderContent()}
                    </div>
                </div>
            </Layout>
        )
    }
    
}