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

                  <li v-if="roles.includes('nouser')">
                      <router-link role="tab"  :to="{name: 'login'}">
                          <i class="fa fa-sign-in "></i>
                      </router-link>
                  </li>

                  <li v-if="roles.includes('admin')">
                      <router-link role="tab"  :to="{name: 'admin'}">
                          <i class="fa fa-lock"></i>
                      </router-link>
                  </li>

                  <li v-if="roles.includes('admin') || roles.includes('normie') ">
                      <router-link role="tab"  :to="{name: 'login'}">
                          <i class="fa fa-sign-out "></i>
                      </router-link>
                  </li>



                  <!--<li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>-->
                  <!--<li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i class="fa fa-github"></i></a></li>-->
            <!---->
              </ul>

              <ul role="tablist">
                  <li><a href="#"  role="tab"><i class="fa fa-gear"></i></a></li>
              </ul>
          </div>
          <side-bar></side-bar>

          <!--<flash-view></flash-view>-->

      </div>

      <osm-map></osm-map>

      <modal-view v-if="showModal" @close="showModal = false">

          <h2 slot="actions">
              <span>
                <i class="fa fa-heart"></i>
              </span>
          </h2>

          <h3 slot="header">{{bar.name}}
          <span>
              <i v-if="bar.internet_access" class="fa fa-wifi" aria-hidden="true"></i>
              <i v-if="bar.wheelchair === 'yes'" class="fa fa-wheelchair-alt" aria-hidden="true"></i>
              <i v-if="bar.amenity === 'restaurant'" class="fa fa-cutlery" aria-hidden="true"></i>
              <i v-if="bar.amenity === 'bar'" class="fa fa-glass" aria-hidden="true"></i>
              <i v-if="bar.amenity === 'cafe'" class="fa fa-coffee" aria-hidden="true"></i>
          </span>


          </h3>



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
                      <div class="tab-content" >
                          <div role="tabpanel" class="tab-pane active" id="uploadTab">

                              <table>
                                  <tr>

                                      <td v-if="bar['addr:street'] !== ''">
                                          <span>
                                              <i class="fa fa-map-marker fa-2x"  aria-hidden="true"></i>
                                          </span>
                                          {{bar['addr:street']}}
                                      </td>
                                      <td></td>
                                  </tr>


                              </table>

                          </div>

                          <div role="tabpanel" class="tab-pane" id="browseTab">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque beatae consectetur deserunt doloribus ipsum neque quas recusandae rem repellendus, sit! Dignissimos dolor, dolorem eligendi error fugiat id obcaecati quaerat reprehenderit.
                          </div>
                      </div>
                  </div>

          </div>

          <div slot="footer">

              <div class="pull-left">
                  <a @click="plotRoute('mapbox/driving')">
                      <img class="transport" src="static/icons/transport/car.svg" alt="">
                  </a>

                  <a @click="plotRoute('mapbox/walking')">
                      <img class="transport" src="static/icons/transport/walk.svg" alt="">

                  </a>


                  <a @click="plotRoute('mapbox/cycling')">
                      <img class="transport" src="static/icons/transport/cycle.svg" alt="">
                  </a>

                  <a @click="plotRoute('mapbox/driving-traffic')">
                      <img class="transport" src="static/icons/transport/traffic-light.svg" alt="">
                  </a>
              </div>

              <button class="btn btn-danger" @click="showModal=false">
                  Close
              </button>



          </div>

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
           updateBars : 'updateBarsAction',
           updateBarDetails: 'updateBarDetailsAction',
            plotRouteAction:  'plotRouteAction'
        }),

        plotRoute: function(profile)
        {

            let options =
            {
              profile: profile
            }

            this.plotRouteAction(options);
            this.showModal = false;
            this.updateBarDetails('');

        },

        updateKeywords: function (event)
        {
            this.$store.dispatch('updateKeywordsAction', event.target.value);
        },

        updateBarsOnEnter: function (e)
        {
            if(e.keyCode  === 13)
            {
                console.log('enter pressed')
                this.updateBarsAndRoute();
            }
        },

        updateBarsAndRoute: function ()
        {
            this.updateBars();
            this.$router.push({name: 'bar_list'});
        },

        setBarDetails: function(details)
        {
            this.updateBarDetails(details);
            this.showModal = true;
            console.log(this.showModal);

        }


    },

    computed:
    {
        ...mapGetters(
            {
                appTitle: 'currentTitle',
                bbox: 'currentBBOX',
                keywords: 'currentKeywords',
                roles: 'currentRole',
                bar: 'currentBarDetails'
            }),
    },

}


</script>

