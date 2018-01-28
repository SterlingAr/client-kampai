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


                  <!--<li v-if="role === 'normie'">-->
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

                  <li v-if="role === 'nouser'">
                      <router-link role="tab"  :to="{name: 'login'}">
                          <i class="fa fa-sign-in "></i>
                      </router-link>
                  </li>

                  <li v-if="role === 'nouser'">
                      <a @click="showModal=true" role="tab">
                          <i class="fa fa-sign-in "></i>
                      </a>
                  </li>



                  <!--<li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>-->
                  <!--<li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i class="fa fa-github"></i></a></li>-->
            <!---->
              </ul>

              <ul role="tablist">
                  <li><a href="#settings" role="tab"><i class="fa fa-gear"></i></a></li>
              </ul>
          </div>

          <side-bar></side-bar>

      </div>

      <osm-map></osm-map>

      <modal-view v-if="showModal" @close="showModal = false">

          <h3 slot="header">Iruña
          <span>
              <i class="fa fa-wifi" aria-hidden="true"></i>
              <i class="fa fa-wheelchair-alt" aria-hidden="true"></i>
              <i class="fa fa-cutlery" aria-hidden="true"></i>
          </span>
          </h3>

          <!--<div slot="body">-->
              <!--<table>-->
                  <!--<tr>-->
                      <!--<th>-->
                          <!--<i class="fa fa-map-marker" aria-hidden="true"></i>                      </th>-->
                      <!--<td>Elm street</td>-->
                  <!--</tr>-->
                  <!--<tr>-->
                      <!--<th>-->
                          <!--<i class="fa fa-rss" aria-hidden="true"></i>-->
                      <!--</th>-->
                      <!--<td>bacalao.es</td>-->
                  <!--</tr>-->
              <!--</table>-->
          <!--</div>-->

          <div slot="body">
                  <div role="tabpanel">
                      <!-- Nav tabs -->
                      <ul class="nav nav-tabs" role="tablist">
                          <li role="presentation" class="active"><a href="#uploadTab" aria-controls="uploadTab" role="tab" data-toggle="tab">Details</a>
                          </li>
                          <li role="presentation"><a href="#browseTab" aria-controls="browseTab" role="tab" data-toggle="tab">King dishes</a>
                          </li>
                      </ul>
                      <!-- Tab panes -->
                      <div class="tab-content">
                          <div role="tabpanel" class="tab-pane active" id="uploadTab">upload Tab</div>
                          <div role="tabpanel" class="tab-pane" id="browseTab">browseTab</div>
                      </div>
                  </div>

          </div>

          <!--<div slot="footer">-->
              <!--<button class="modal-default-button" @click="$emit('close')">-->
                  <!--OK-->
              <!--</button>-->
          <!--</div>-->

      </modal-view>

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

    data ()
    {
        return {

            showModal : false

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
                keywords: 'currentKeywords',
                role: 'currentRole'
            }),
    },

}


</script>

