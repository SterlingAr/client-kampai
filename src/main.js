// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import 'font-awesome/css/font-awesome.css'
import '@/assets/common/js/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
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
import '@/assets/contact/contact.scss'
import '@/assets/newbar/newbar.scss'
import '@/assets/leaflet/plugins/routing/leaflet-routing-machine.css'
import '@/assets/leaflet/plugins/routing/leaflet-routing-machine.js'
import '@/assets/bar/icons.css'
import '@/assets/bar/bar-list.css'
import '@/assets/leaflet/plugins/credits/leaflet-control-credits.js'
import '@/assets/leaflet/plugins/credits/leaflet-control-credits.css'
import 'animate.css'
import 'leaflet-toolbar'
import '@/assets/leaflet/css/toolbar/tool-bar.css'





import Vue from 'vue'
import VueJWT from 'vuejs-jwt'
import router from './router'
import store  from './store/store.js'
import App from './App.vue'
import VeeValidate from 'vee-validate';


// Vue.use(VueJWT,options)
Vue.config.productionTip = false
Vue.component('osm-map', require('./components/OsmMap.vue'));
Vue.component('user-profile', require('./components/user/ProfileView.vue'));
Vue.component('owned-bars', require('./components/user/OwnedBarsView.vue'));
Vue.component('side-bar', require('./components/SideBar.vue'));
Vue.component('side-bar-content', require('./components/SideBarContent.vue'));
Vue.component('home', require('./components/Home.vue'));
Vue.component('login', require('./components/auth/Login.vue'));
Vue.component('register', require('./components/auth/Register.vue'));
Vue.component('contact', require('./components/Contact.vue'));
Vue.component('newbar', require('./components/NewBar.vue'));
Vue.component('admin', require('./components/Admin.vue'));
// Vue.component('modal-view', require('./components/bar/BarModalView.vue'));
Vue.component('modal-view', {
    template: '#modal-view',
})

Vue.component('bar-claim-view', {
    template: '#bar-claim-view',
})


Vue.use(VeeValidate);


window.App = new Vue({
  el: '#app',
  router,
  store,
  components : {
    'app' : App
  },
  template: '<app ref="main"> </app>'

})


