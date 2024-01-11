import { get, post, post_json } from '../../http/axios'
export default {
  namespaced: true,
  state: {
    orders: [],
    // 全部订单数据
    orderList: []
  },
  mutations: {
    refreshOrder(state, orders) {
      state.orders = orders
    },
    GET_AllOrderData(state, allOrderList){
      state.orderList = allOrderList
    }
  },
  actions: {
    // 保存订单
    async SubmitOrder({ commit }, data) {
      // 调用接口完后保存
      let response = await post_json('/app/order/submitOrder', data)
      // console.log(response)
      if (response.data.message == '操作成功') {
        // 清空购物车
        commit('shopcart/clearShopcart', null, { root: true })
      } else {

      }
      return response
    },
    // 获取所有订单数据
    async findAllOrderData({ commit }, data){
      let res = await get('/order/pageQuery', data)
      commit('GET_AllOrderData', res.data.data.list)
      // console.log(res);
    },
    // 支付接口
    // async orderPay({ commit }, orderId){
    //   // 调用接口完后保存
    //   let response = await get('/app/order/pay?id=' + orderId)
    //   // console.log(response)
    //   if (response.data.message == '余额不足!') {

    //   } else if (response.data.message == '支付成功') {
        
    //   } else {

    //   }
    //   return response
    // }
  }
}