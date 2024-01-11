import { get, post, post_json } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    SET_UserInfo(state, userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
    // 获取用户信息
    async getUserInfo({commit}, params) {
      let res = await get('/user/info?token='+localStorage.getItem('token'))
      commit('SET_UserInfo', res.data.data)
      // console.log(res);
    }
  }
}