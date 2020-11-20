import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'
const state = {
  user: null,
  // apiStatus = API 呼び出しが成功したか失敗したかを表す
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
};

const mutations = {
  setUser(state, user){
    state.user = user
  },
  setApiStatus(state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages(state, messages) {ds
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages(state, message) {
    state.registerErrorMessages = message
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
  //会員登録
  async register (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/register', data)

    //館員登録が成功した場合
    if(response.status === CREATED) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    //館員登録に失敗した場合
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setRegisterErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },
  //login
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    //バリデーションエラー
    context.commit('setApiStatus', false)
    if(response.status === UNPROCESSABLE_ENTITY){
      console.log(response.status);
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
    //別storeにコミットする時は第３引数に { root: ture }を追加する
    context.commit('error/setCode', response.status, { root: true })
  },
  //logout
  async logout (context) {
    // まずはapistatsの初期化
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/logout')
    //api接続がOKなら
    if(response.status === OK ) {
      context.commit('setApiStatus', true)
      context.commit('setUser', null)
      return false
    }

    //api接続が失敗したら
    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true})

  },
  //get login User
  async currentUser(context) {
    context.commit('setApiStatus', null)
    const response = await axios.get('api/user');
    // axiosで取得したデータが存在いれば、そのまま代入、無ければnull
    const user = response.data || null;

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', user)
      return false
    }

    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
