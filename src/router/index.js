import Vue from 'vue'
import Router from 'vue-router'
import BarList from '../components/bar/BarList.vue'
import ProfileView from '../components/user/ProfileView.vue'
import OwnedBarsView from '../components/user/OwnedBarsView.vue'

import Home from '../components/Home.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Contact from '../components/Contact.vue'
// import BarModalView from '../components/bar/BarModalView.vue'
Vue.use(Router)

export default new Router({
  routes: [
      {
      path: '/',
      name: 'home',
      components:
          {
            default: Home,
          }
      },

      {
          path: '/profile',
          name: 'profile',
          components:
              {
                  profile_view: ProfileView,
              }
      },
      {
          path: '/owned-bars',
          name: 'owned_bars',
          components:
              {
                  owned_bars_view: OwnedBarsView,
              },
          props: {
                  owned_bars_view: true
              }
      },

      {
          path: '/bars',
          name: 'bar_list',
          components:
              {
                  bar_list_view: BarList,
              },
          props:
              {
                  default: true,
              }

      },

      {
          path: '/login',
          name: 'login',
          components:
              {
                  login_view: Login,
              },
          props: {
              login_view: true
          }
      },
      {
          path: '/register',
          name: 'register',
          components:
              {
                  register_view: Register,
              },
      },
      {
          path: '/contact',
          name: 'contact',
          components:
              {
                  contact_view: Contact,
              },
      },
      // {
      //     path: '/newbar',
      //     name: 'newbar',
      //     components:
      //         {
      //             newbar_view: NewBar,
      //         },
      // },
      // // {
      //     path: '/admin',
      //     name: 'admin',
      //     components:
      //         {
      //             admin_view: Admin,
      //         },
      // },



  ]
})
