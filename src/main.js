// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import "@/assets/styles.scss"

// import '@/assets/sidebar/sass/fontawesome/fontawesome.scss'
// import '@/assets/fonts/font-awesome.min.css'
import '@/assets/sidebar/sass/leaflet-sidebar.scss'
import '@/assets/leaflet/leaflet.css'
import '@/assets/map.css'
import '@/assets/leaflet/leaflet.js'
import '@/assets/sidebar/js/leaflet-sidebar.js'
import '@/assets/leaflet/plugins/Leaflet.Control.Custom.js'
import '@/assets/sidebar/css/search-box.css'


import Vue from 'vue'
import router from './router'
import store  from './store/store.js'
import App from './App.vue'
Vue.config.productionTip = false
Vue.component('osm-map', require('./components/OsmMap.vue'));
Vue.component('user-profile', require('./components/user/ProfileView.vue'));
window.App = new Vue({
  el: '#app',
  router,
  store,
  components : {
    'app' : App
  },
  template: '<app ref="main"> </app>'

})
