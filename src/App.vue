<template>
  <div id="app-container">
      <!-- Change menu value in storage every time i need toggle the menu-->
      <div id="sidebar" v-bind:class="menuClass">

          <!-- Nav tabs -->
          <div class="sidebar-tabs">
              <ul role="tablist">

                  <!--<li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li>-->
                  <li>
                      <router-link role="tab"  :to="{name: 'home'}">
                          <img class="menu" src="static/icons/menu/house.svg" alt="">
                      </router-link>
                  </li>

                  <li>
                      <router-link role="tab"  :to="{name: 'bar_list'}">
                          <img class="menu" src="static/icons/menu/toast.svg" alt="">
                      </router-link>
                  </li>

                  <li v-if="roles.includes('normie') || roles.includes('owner') || roles.includes('admin')">
                      <router-link  role="tab"  :to="{name: 'profile'}">
                          <img class="menu" src="static/icons/menu/users.svg" alt="">
                      </router-link>
                  </li>

                  <li v-if="roles.includes('nouser')">
                      <router-link role="tab"  :to="{name: 'login'}">
                          <img class="menu" src="static/icons/menu/login.svg" alt="">
                      </router-link>
                  </li>


                  <li>
                      <a href="#" @click="claimModal(true)">
                          <img class="menu" src="static/icons/dev/compass.svg" alt="">
                      </a>
                  </li>

                  <!--<li v-if="roles.includes('admin')">-->
                      <!--<router-link role="tab"  :to="{name: 'admin'}">-->
                          <!--<i class="fa fa-lock"></i>-->
                      <!--</router-link>-->
                  <!--</li>-->


                  <!--<li class="disabled"><a href="#messages" role="tab"><i class="fa fa-envelope"></i></a></li>-->
                  <!--<li><a href="https://github.com/Turbo87/sidebar-v2" role="tab" target="_blank"><i class="fa fa-github"></i></a></li>-->
            <!---->
              </ul>

              <ul role="tablist">
                  <li><a @click="openDataLayer" role="tab"><i class="fa fa-gear"></i></a></li>
              </ul>


          </div>
          <side-bar></side-bar>

          <!--<flash-view></flash-view>-->

      </div>

      <osm-map></osm-map>

      <modal-view v-bind:class="modalAnimation" v-if="modal" @close="modal = false">

          <h2 slot="actions">
              <span>
                <img v-if="!isFavOrNot" @click="addBarToSubsIfLoggedIn(bar)" :class="{'animated pulse infinite': true}" class="modal-icons no-like pull-right" src="static/icons/modal/no_like.svg" alt="">
                <img v-if="isFavOrNot" @click="removeBarFromSubs(bar)" :class="{'animated flip': true}" class="modal-icons like pull-right" src="static/icons/modal/like.svg" alt="">

              </span>
          </h2>

          <h3 slot="header">{{bar.name}}
          <span>
              <i v-if="bar.internet_access" class="fa fa-wifi" aria-hidden="true"></i>

              <i v-if="bar.wheelchair === 'yes'" class="fa fa-wheelchair-alt" aria-hidden="true"></i>
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
                                  <tr v-if="bar['addr:street']">
                                      <td>
                                          <p>
                                              <img class="map-icons " src="static/icons/map/map.svg" alt="address">

                                              {{bar['addr:street']}} <span v-if="bar['addr:housenumber']">{{bar['addr:housenumber']}}</span>
                                          </p>
                                      </td>
                                  </tr>

                                  <tr v-if="bar['contact:facebook']">
                                      <td >
                                          <p>
                                              <img class="map-icons " src="static/icons/modal/facebook.svg" alt="facebook">

                                              <a v-bind:href="linkFB">
                                                  Me gusta!.
                                              </a>

                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.website">
                                      <td >
                                          <p>
                                              <img class="map-icons " src="static/icons/modal/website.svg" alt="website">
                                              <a v-bind:href="linkWS">
                                                  Visita nuestra página web.
                                              </a>
                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.phone">
                                      <td >
                                          <p>
                                              <img class="map-icons animated hinge infinite " src="static/icons/modal/phone.svg" alt="phone">
                                              <a  v-bind:href="tlf">
                                                  Llámanos
                                              </a>
                                          </p>
                                      </td>
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

              <button class="btn btn-danger" @click="updateModal(false)">
                  Close
              </button>
          </div>
      </modal-view>


      <modal-view v-if="claimModalStatus" @close="claimModal = false">

          <div slot="body" v-if="claimSent === false">
              <div slot="header">
                  <h1>Reclamar establecimiento</h1><br>
              </div>
              <div id="newbar-form">
                  <div class="newbar-content">
                      <form v-if="claimSent === false">
                          <label>Nombre:</label><br>
                          <input type="text" name="nombre" placeholder="Name"><br>
                          <label>Direccion:</label><br>
                          <input type="text" name="direccion" placeholder="Direction"><br>
                          <label>Number:</label><br>
                          <input type="number" placeholder="Number" name="number"><br>
                          <label for="exampleInputFile">Documentación</label>
                          <input type="file" id="exampleInputFile">
                          <br>
                          <input @click="claimSent = true" type="button" class="newbar newbar-button" value="Añadir bar" name="newbar">
                      </form>
                  </div>
              </div>
          </div>

          <div v-if="claimSent" slot="body">
              <div >
                  <h1>Solicitud enviada</h1>
                  <p>
                      En un plazo máximo de 48 horas recibirás un email con la respuesta a tu solicitud.
                  </p>
                  <input @click="claimModal(false)" type="button" class="newbar newbar-button" value="Cerrar" name="newbar">

              </div>
          </div>
      </modal-view>

  </div>
</template>

<script>


import {mapGetters,mapActions} from 'vuex';

import OsmMap from './components/OsmMap.vue';
import SideBar from './components/SideBar.vue';

export default
{
    name: 'App',
    components: {OsmMap,SideBar},


    data ()
    {
        return {
            claimSent: false,
            collapsedMenuClass: 'sidebar collapsed sidebar-left leaflet-touch',
            notCollapsedMenuClass: 'sidebar sidebar-left leaflet-touch',
            currentMenuClass: '',
            lightSpeedIn: 'animated lightSpeedIn',
            lightSpeedOut: 'animated lightSpeedOut'
        }
    },

    methods:
    {

        ...mapActions({
           updateBars : 'updateBarsAction',
           updateBarDetails: 'updateBarDetailsAction',
           updateModal: 'updateModalAction',
           plotRouteAction:  'plotRouteAction',
           odLayer: 'openDataLayerAction',
           addBarToSubs: 'addBarToSubsAction',
           removeBarFromSubs: 'removeBarFromSubs',
           claimModal: 'claimModalAction',
           menuAction: 'menuAction'
        }),

        addBarToSubsIfLoggedIn: function (bar)
        {
            if(this.user !== '')
            {
                this.addBarToSubs(bar);
                return;
            }

            this.updateModal(false);

            this.$router.push({
                name:'login',
                params: {
                    loginRequired: true
                }
            });
        },

        plotRoute: function(profile)
        {
            this.menuAction(false);

            this.updateModal(false);

            let options =
            {
              profile: profile
            }

            this.plotRouteAction(options);
            // this.updateBarDetails('');


        },

        updateKeywords: function (event)
        {
            this.$store.dispatch('updateKeywordsAction', event.target.value);
        },

        updateBarsOnEnter: function (event)
        {
            if(event.keyCode  === 13)
            {
                console.log('enter pressed')
                this.$store.dispatch('updateKeywordsAction', event.target.value);
                this.updateBarsAndRoute();
                this.menuAction(true);

            }
        },

        updateBarsAndRoute: function ()
        {
            this.updateBars();
            this.$router.push({name: 'bar_list'});
            this.menuAction(true);
        },

        setBarDetails: function(details)
        {
            this.updateBarDetails(details);
            this.updateModal(true);
            this.menuAction(true);

        },

        openDataLayer: function ()
        {
            //TODO
            this.odLayer();
        },



    },

    computed:
    {
        ...mapGetters(
            {
                appTitle: 'currentTitle',
                bbox: 'currentBBOX',
                keywords: 'currentKeywords',
                roles: 'currentRole',
                bar: 'currentBarDetails',
                modal: 'currentModal',
                claimModalStatus: 'currentClaimModal',
                subscriptions: 'currentSubscriptions',
                menuStatus: 'currentMenu',
                isFavOrNot: 'currentIsBarInUserList',
                user: 'currentUser'
            }),



        menuClass: function ()
        {
            return this.menuStatus ? this.notCollapsedMenuClass : this.collapsedMenuClass;
        },

        modalAnimation: function ()
        {
            return this.modal ? this.lightSpeedIn : this.lightSpeedOut;
        },

        //Social network links.
        linkFB: function(){ return this.bar['contact:facebook'];},
        linkWS: function(){ return this.bar.website;},
        tlf: function(){return 'tel:'+this.bar.phone;},
        



    },

}


</script>

