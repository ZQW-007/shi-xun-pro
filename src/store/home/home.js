import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    // 轮播图数据
    swiperData: []
  },
  mutations: {
    SET_SwiperData(state, swiperData){
      state.swiperData = swiperData
    }
  },
  actions: {
    // 获取轮播图信息
    async getSwiperData({commit}){
      let res = await get('/carousel/findAll')
      commit('SET_SwiperData', res.data.data)
      // console.log(res);
    }
    // 获取产品分类
  }
}