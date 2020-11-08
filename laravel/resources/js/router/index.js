import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store.js'

import PhotoList from '../pages/PhotoList.vue';
import Login from '../pages/Login.vue';
import SystemErrot from '../pages/errors/System.vue'

Vue.use(VueRouter);

export default new VueRouter ({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: PhotoList
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
