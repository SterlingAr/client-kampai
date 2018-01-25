// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import "@/assets/styles.scss"

import '@/assets/sidebar/sass/fontawesome/fontawesome.scss'
import '@/assets/sidebar/sass/leaflet-sidebar.scss'
import '@/assets/leaflet/leaflet.css'
import '@/assets/map.css'
import '@/assets/leaflet/leaflet.js'
import '@/assets/sidebar/js/leaflet-sidebar.js'
import '@/assets/leaflet/plugins/Leaflet.Control.Custom.js'
import Vue from 'vue'
import router from './router'
import store  from './store/store.js'
import App from './App.vue'
window.Vue = Vue;
Vue.config.productionTip = false
Vue.component('osm-map', require('./components/OsmMap.vue'));

new Vue({
  el: '#app',
  router,
    store,
    components : {App},
    template: '<App/>'

})
