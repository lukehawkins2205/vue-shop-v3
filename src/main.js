import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import {store} from './store'
import firebase from 'firebase/app'
import Alert from './shared/Alert.vue'
import 'firebase/firestore';

Vue.config.productionTip = false;
Vue.component('app-alert', Alert)
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
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.$store.dispatch('autoSignInUser', user)
      }
    })
    this.$store.dispatch('loadProducts')
  }
}).$mount("#app");
