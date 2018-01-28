// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '@/assets/sidebar/sass/leaflet-sidebar.scss'
import '@/assets/leaflet/leaflet.css'
import '@/assets/map.css'
import '@/assets/leaflet/leaflet.js'
import '@/assets/sidebar/js/leaflet-sidebar.js'
import '@/assets/leaflet/plugins/Leaflet.Control.Custom.js'
import '@/assets/sidebar/css/search-box.css'
import '@/assets/login/login.scss'
import '@/assets/bar/modal.css'
import '@/assets/profile/profile.css'
import '@/assets/profile/profile.js'
import '@/assets/leaflet/plugins/location/L.Control.Locate.min.css'
import '@/assets/leaflet/plugins/location/L.Control.Locate.min.js'


import Vue from 'vue'
import VueJWT from 'vuejs-jwt'
import router from './router'
import store  from './store/store.js'
import App from './App.vue'

// Vue.use(VueJWT,options)
Vue.config.productionTip = false
Vue.component('osm-map', require('./components/OsmMap.vue'));
Vue.component('user-profile', require('./components/user/ProfileView.vue'));
Vue.component('side-bar', require('./components/SideBar.vue'));
Vue.component('side-bar-content', require('./components/SideBarContent.vue'));
Vue.component('home', require('./components/Home.vue'));
Vue.component('login', require('./components/auth/Login.vue'));
Vue.component('register', require('./components/auth/Register.vue'));
// Vue.component('modal-view', require('./components/bar/BarModalView.vue'));
Vue.component('modal-view', {
    template: '#modal-view',
})




window.App = new Vue({
  el: '#app',
  router,
  store,
  components : {
    'app' : App
  },
  template: '<app ref="main"> </app>'

})


