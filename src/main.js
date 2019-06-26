import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import _ from 'vue-lodash'
// import '@babel/polyfill'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCD2tboPAqUd0wQ8vqVm6PRYxLlxg4WBX4",
  authDomain: "vue-app-demo-f5fc8.firebaseapp.com",
  databaseURL: "https://vue-app-demo-f5fc8.firebaseio.com",
  projectId: "vue-app-demo-f5fc8",
  storageBucket: "vue-app-demo-f5fc8.appspot.com",
  messagingSenderId: "411959514458",
  appId: "1:411959514458:web:a962937db82ced49"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
