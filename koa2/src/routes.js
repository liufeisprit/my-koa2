import AC from './components/async_load';

export default [
    {
        name:'首页',
        icon:'home',
        path:'/',
        component:AC(()=>import('./views/home/index'))
    },
    {
        name:'详情页',
        path:'/detail/:id',
        component:AC(()=>import('./views/movie/detail'))
    },
    {
        name:'后台入口页',
        path:'/admin',
        component:AC(()=>import('./views/login/index'))
    }
]

