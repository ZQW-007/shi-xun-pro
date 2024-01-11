import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    // 产品分类数据
    addressData: [],
  },
  mutations: {
    // 产品分类数据
    SET_AddressData(state, addressData) {
      state.addressData = addressData
    }
  },
  actions: {
    // 获取地址列表
    async getAddressData({ commit }, userId) {
      let res = await get('/app/address/queryByUserId?userId='+ userId)
      commit('SET_AddressData', res.data.data)
      // console.log(res.data.data);
    },
    // 新增地址
    async saveOrUpdateAddress({commit}, params){
      let res = await post('/app/address/saveOrUpdate', params)
      // console.log(res);
      return res
    },
    // 删除地址
    async deleteAddressById({ commit }, addressId){
      
    }
  }
}