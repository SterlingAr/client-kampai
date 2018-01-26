import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import BarList from '../components/bar/BarList.vue'
import ProfileView from '../components/user/ProfileView.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      children: [
      {
        path: '/bars',
        name: 'bar_list',
        components:
            {
                default: BarList,
            },

        props: {
            default: true,
        }

      },
      {
          path: '/profile',
          name: 'profile',
          components:
              {
                  profile_view: ProfileView,
              }
      }
      ]
    }
  ]
})
