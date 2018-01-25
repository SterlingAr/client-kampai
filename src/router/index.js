import Vue from 'vue'
import Router from 'vue-router'
import OsmMap from '../components/OsmMap.vue'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OsmMap',
      component: OsmMap
    }
  ]
})
