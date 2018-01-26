import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import BarList from '../components/bar/BarList.vue'
import ProfileView from '../components/user/ProfileView.vue'
import SideBar from '../components/SideBar.vue'
import SideBarContent from '../components/SideBarContent.vue'
import Home from '../components/Home.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'

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
      path: '/bars',
      name: 'bar_list',
      components:
          {
              bar_list_view: BarList,
          },
      props: {
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


      },

  ]
})
