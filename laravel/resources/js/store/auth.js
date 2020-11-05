const state = {
  user: null
};

const mutations = {
  setUser(state, user){
    state.user = user
  }
};

const getters = {
  // !!は真偽値に変換している。この場合stateに値があればtureを返す
  check: state => !! state.user,
  username: state => state.user ?  state.user.name : ''
};

const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
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
