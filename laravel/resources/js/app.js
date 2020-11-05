import './bootstrap'
import Vue from 'vue';
import router from './router/index.js'
import store from './store/store.js'
import App from './App.vue';

require('./bootstrap');
//window.Vue = require('vue');

//relordによるvuex初期化に対応
const createApp = async () => {
	await store.dispatch('auth/currentUser')
}

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
//呼び出しに関してはVueInstanceが作成されてから。
createApp();
