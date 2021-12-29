import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 防止路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 默认加载界面
  {
    path: '/',
    redirect: '/login'
  },
  // 登录页面界面
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  // 注册页面路由
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  // 总路由
  {
    path: '/manager',
    name: 'manager',
    component: () => import('@/views/Manager.vue'),
    children:[
      // 首页
      {
        path: 'home',
        component: () => import('@/views/Home/home.vue')
      },
      // 订单
      {
        path: 'order',
        component: () => import('@/views/Order/order.vue')
      },
      // 订单详情
      {
        path: 'orderDetail',
        component: () => import('@/views/Order/orderDetail.vue')
      },
      // 我的
      {
        path: 'mine',
        component: () => import('@/views/Mine/mine.vue')
      },
      // 地址列表
      {
        path: 'address',
        component: () => import('@/views/Mine/address.vue'),
      },
      // 产品页面
      {
        path: 'product',
        component: () => import('@/views/Product/product.vue'),
      },
      // 订单提交页面
      {
        path: 'orderConfirm',
        component: () => import('@/views/Product/orderConfirm.vue'),
      }
    ]
  },
  
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫 判断有无token
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //若要跳转的页面是登录界面
  if (to.path === '/login') {
    //直接跳转
    next();
  } else { //若想要跳转其他页面
    //获取本地存储的token值
    let token = localStorage.getItem('token');
    //若token为空则验证不成功，跳转到登录页面
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
