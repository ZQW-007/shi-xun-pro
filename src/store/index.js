import Vue from 'vue'
import Vuex from 'vuex'
// 引入注册模块
import register from './register/register'
// 引入首页模块
import home from './home/home'
// 引入用户模块
import user from './user/user'
// 引入产品分类模块
import category from './category/category'
// 引入产品模块
import product from './product/product'
// 引入购物车模块
import shopcart from './shopcart/shopcart'
// 引入地址模块
import address from './address/address'
// 引入订单模块
import order from './order/order'
// 引入充值模块
import recharge from './recharge/recharge'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token存储
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutations: {
    //存储token
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token.token);
    },
    //删除token
    delToken(state) {
      state.token = '';
      localStorage.removeItem("token");
    }
  },
  actions: {
  },
  modules: {
    // 注册模块
    register,
    // 首页模块
    home,
    // 用户模块
    user,
    // 产品分类模块
    category,
    // 产品模块
    product,
    // 购物车模块
    shopcart,
    // 地址模块
    address,
    // 订单模块
    order,
    // 充值模块
    recharge
  }
})
