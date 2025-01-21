import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import remenjingdian from '@/views/modules/remenjingdian/list'
    import jingdianpingjia from '@/views/modules/jingdianpingjia/list'
    import paixingbang from '@/views/modules/paixingbang/list'
    import discusslvyouxianlu from '@/views/modules/discusslvyouxianlu/list'
    import jingdianfenlei from '@/views/modules/jingdianfenlei/list'
    import yonghu from '@/views/modules/yonghu/list'
    import discussremenjingdian from '@/views/modules/discussremenjingdian/list'
    import discusspaixingbang from '@/views/modules/discusspaixingbang/list'
    import chat from '@/views/modules/chat/list'
    import menpiaodingdan from '@/views/modules/menpiaodingdan/list'
    import lvyouxianlu from '@/views/modules/lvyouxianlu/list'
    import config from '@/views/modules/config/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '首页',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '网站公告',
        component: news
      }
      ,{
	path: '/remenjingdian',
        name: '热门景点',
        component: remenjingdian
      }
      ,{
	path: '/jingdianpingjia',
        name: '景点评价',
        component: jingdianpingjia
      }
      ,{
	path: '/paixingbang',
        name: '排行榜',
        component: paixingbang
      }
      ,{
	path: '/discusslvyouxianlu',
        name: '旅游线路评论',
        component: discusslvyouxianlu
      }
      ,{
	path: '/jingdianfenlei',
        name: '景点分类',
        component: jingdianfenlei
      }
      ,{
	path: '/yonghu',
        name: '用户',
        component: yonghu
      }
      ,{
	path: '/discussremenjingdian',
        name: '热门景点评论',
        component: discussremenjingdian
      }
      ,{
	path: '/discusspaixingbang',
        name: '排行榜评论',
        component: discusspaixingbang
      }
      ,{
	path: '/chat',
        name: '在线客服',
        component: chat
      }
      ,{
	path: '/menpiaodingdan',
        name: '门票订单',
        component: menpiaodingdan
      }
      ,{
	path: '/lvyouxianlu',
        name: '旅游线路',
        component: lvyouxianlu
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '首页',
    redirect: '/index'
  }, /*默认跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
