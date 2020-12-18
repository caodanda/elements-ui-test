import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import login from './components/login.vue'
import welcome from './components/welcome.vue'
import user from './components/user.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
// 配置请求基本路径
axios.defaults.baseURL = 'https://mock.yonyoucloud.com/mock/16566'
Vue.prototype.$ajax = axios


const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:login},
  {path:'/home',component:home,
  // 
    children:[
      {path:'/home',redirect:'/welcome'},
      {path:'/welcome',component:welcome},
      {path:'/user',component:user}
    ]


  },
  

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  // 页面为登录页，则直接跳转，非登录页往下进行判断
  if(to.path === '/login'){
    next()
  }
  // 获取sessionStorage的token值进行判断
  let token = window.sessionStorage.getItem('token');
  // token值为空，跳转登录页；token值不为空，跳转到对应路由页
  if(!token){
    next('/login')
  }
  next()

})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
