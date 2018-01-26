<template>
  <div id="app-container">
      <div id="sidebar" class="sidebar collapsed">

          <!-- Nav tabs -->
          <div class="sidebar-tabs">
              <ul role="tablist">

                  <!--<li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>-->
                  <li>
                      <router-link role="tab"  :to="{name: 'home'}">
                          <i class="fa fa-home"></i>
                      </router-link>
                  </li>


                  <li>
                  <router-link  role="tab"  :to="{name: 'profile'}">
                      <i class="fa fa-user"></i>
                  </router-link>
                  </li>


                  <li>
                      <router-link role="tab"  :to="{name: 'bar_list'}">
                          <i class="fa fa-beer"></i>
                      </router-link>
                  </li>

                  <li>
                      <router-link role="tab"  :to="{name: 'login'}">
                          <i class="fa fa-sign-in "></i>
                      </router-link>
                  </li>


                  <li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>
                  <li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i class="fa fa-github"></i></a></li>
              </ul>

              <ul role="tablist">
                  <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
              </ul>
          </div>

          <!--<router-view name="bar-list"></router-view>-->

           <!--Tab panes-->
          <!--<div class="sidebar-content">-->
              <!--<div class="sidebar-pane" id="home">-->

                  <!--<h1 class="sidebar-header">-->
                      <!--sidebar-v2-->
                      <!--<span class="sidebar-close"><i class="fa fa-caret-left"></i></span>-->
                  <!--</h1>-->

                   <!--</div>-->
              <!--<div class="sidebar-pane" id="profile">-->
                  <!--<router-link :to="{name: 'profile'}">-->
                      <!--<h1 class="sidebar-header">Profile<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
                  <!--</router-link>-->
                  <!--<router-view name="user-profile"></router-view>-->
              <!--</div>-->

              <!--<div class="sidebar-pane" id="messages">-->
                  <!--<h1 class="sidebar-header">Messages<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
              <!--</div>-->

              <!--<div class="sidebar-pane" id="settings">-->
                  <!--<h1 class="sidebar-header">Settings<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
              <!--</div>-->
          <!--</div>-->
      <!--<router-view></router-view>-->
          <side-bar></side-bar>

      </div>

      <osm-map></osm-map>
      <!--<router-view></router-view>-->
  </div>
</template>

<script>


import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

import OsmMap from './components/OsmMap.vue';
import SideBar from './components/SideBar.vue';

export default
{
    name: 'App',
    components: {OsmMap,SideBar},
    //DIRTY, dirty hack...
    mounted() {

    },

    data ()
    {
        return {

            appObject:
            {
                title: 'KAMPAI',
            },
            users: []

        }
    },
    methods:
    {

        ...mapActions({
           updateBars : 'updateBarsAction'
        }),

        updateKeywords: function (event)
        {
            this.$store.dispatch('updateKeywordsAction', event.target.value);
        },

        updateBarsAndRoute: function ()
        {

            this.updateBars();

            this.$router.push({name: 'bar_list'});

        }


    },

    computed:
    {
        ...mapGetters(
            {
                appTitle: 'currentTitle',
                bbox: 'currentBBOX',
                keywords: 'currentKeywords'
            }),
    },

}


</script>

