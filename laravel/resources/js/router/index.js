import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store.js'

import PhotoList from '../pages/PhotoList.vue';
import PhotoDetail from '../pages/PhotoDetail';
import Login from '../pages/Login.vue';
import SystemErrot from '../pages/errors/System.vue';


Vue.use(VueRouter);

export default new VueRouter ({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: PhotoList
    },
    {
      path: '/hoto/:id', //:id は URL の変化する部分（ここでは写真ID）
      component: PhotoDetail,
      //変数部分（写真IDの値）を props として受け取ることを意味します。
      props: true
    },
    {
      path: '/login',
      component: Login,
      beforeEnter (to, from, next) {
        if (store.getters['auth/check']) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/500',
      component: SystemErrot
    }
  ]
})
