import { post, get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    // 产品分类数据
    categoryData: {},
  },
  mutations: {
    // 产品分类数据
    SET_CategoryData(state, categoryData){
      state.categoryData = categoryData
    }
  },
  actions: {
    // 获取产品分类
    async getCategoryData({commit}, params){
      let res = await get('/productCategory/pageQuery', params)
      commit('SET_CategoryData', res.data.data)
      // console.log(res);
    }
  }
}