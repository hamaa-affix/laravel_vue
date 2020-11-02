import Vue from 'vue';
import VueRouter from 'vue-router';

import PhotoList from '../pages/PhotoList.vue';
import Login from '../pages/Login.vue';

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
      component: Login
    }
  ]
})
