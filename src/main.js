import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import {store} from './store'
import firebase from 'firebase/app'

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyDC8lc-hfYhdLBLxjmPWl_Bq206aK6VqK8',
      authDomain: 'vuejs-store-1e043.firebaseapp.com',
      projectId: 'vuejs-store-1e043',
      storageBucket: 'vuejs-store-1e043.appspot.com',
      messagingSenderId: '64803745290',
      appId: '1:64803745290:web:ee888996545e66ca9439f3',
      measurementId: 'G-C9EWN08CBT'
    })
  }
}).$mount("#app");
