import Vue from 'vue';
import router from './router/index.js'
import App from './App.vue';

require('./bootstrap');
//window.Vue = require('vue');



const app = new Vue({
    el: '#app',
    render: h => h(App),
    router
});
