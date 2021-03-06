import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.js'
import error from './error.js'
import message from './message'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    message
  }
})
