// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/assets/styles.scss"
import '@/assets/leaflet/leaflet.css';
import '@/assets/leaflet/leaflet.js';
import '@/assets/map.css';
import '@/assets/initmap.js';

import Vue from 'vue'
import router from './router'
import OsmMap from './components/OsmMap.vue'
import App from './App.vue'
//import 'normalize.css'



Vue.config.productionTip = false

Vue.component('mapa', require('./components/OsmMap.vue'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { OsmMap,App },
  template: '<App/>'
})
