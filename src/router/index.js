import Vue from 'vue'
import Router from 'vue-router'
import user from '../pages/user'
import login from '../pages/login'
import Home from '../pages/Home'
import homepage from '../pages/homepage'
import report from '../pages/report'
import addBgm from '../pages/addBgm'
import bgm from '../pages/bgm'
import videoList from '../pages/videoList'
import collectionChannel from '../pages/collectionChannel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children:[{
        path:'/Home/homepage',
        name:'homepage',
        component:homepage
      },
        {
          path:'/Home/collectionChannel',
          name:'collectionChannel',
          component:collectionChannel
        },
        {
          path:'/Home/user',
          name:'user',
          component:user
        },
        {
          path:'/Home/videos',
          name:'videos',
          component:videoList
        },
        {
          path:'/Home/report',
          name:'report',
          component:report
        }
        ,{
          path:'/Home/bgm',
          name:'bgm',
          component:bgm
        },{
          path:'/Home/addBgm',
          name:'addBgm',
          component:addBgm
        }]
    }
  ]
})
