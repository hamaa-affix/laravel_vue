import { OK } from '../util'
const state = {
  user: null,
  apiStatus: null
};

const mutations = {
  setUser(state, user){
    state.user = user
  },
  setApiStatus(state, status) {
    state.apiStatus = status
  }
};

//frontend conections
const getters = {
  // !!は真偽値に変換している。この場合stateに値があればtureを返す
  check: state => !! state.user,
  username: state => state.user ?  state.user.name : ''
};

//backend cnections
const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)
    //別storeにコミットする時は第３引数に { root: ture }を追加する
    context.commit('error/setCode', response.status, { root: true })
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser(context) {
    const response = await axios.get('api/user');
    // axiosで取得したデータが存在いれば、そのまま代入、無ければnull
    const user = response.data || null;
    context.commit('setUser', user);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
