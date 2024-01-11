import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    // 余额充值
    async getRecharge({commit}, data){
      let res = await get('/account/recharge', data)
      // console.log(res);
      return res
    }
  }
}