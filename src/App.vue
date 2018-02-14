<template>
  <div id="app-container">
      <!-- Change menu value in storage every time i need toggle the menu-->
      <div id="sidebar"  class="animated fadeInLeft sidebar  sidebar-left leaflet-touch collapsed">

          <!-- Nav tabs -->
          <div class="sidebar-tabs">
              <ul role="tablist">

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


                  <li v-if="roles.includes('owner')">
                      <router-link role="tab"  :to="{name: 'owned_bars'}">
                          <img class="menu" src="static/icons/menu/bars.svg" alt="">
                      </router-link>
                  </li>

              </ul>

              <ul role="tablist">
                  <li><a @click="openDataLayer" role="tab"><i class="fa fa-gear"></i></a></li>
              </ul>


          </div>
          <side-bar></side-bar>


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
              <hr>
              <i v-if="bar.internet_access" class="fa fa-wifi" aria-hidden="true"></i>
              <i class="fa fa-wifi fa-disabled" aria-hidden="true" v-else></i>

              <i v-if="bar.wheelchair === 'yes'" class="fa fa-wheelchair-alt" aria-hidden="true"></i>
              <i class="fa fa-wheelchair fa-disabled" aria-hidden="true" v-else></i>
              <br>
              <hr>
              <i v-if="bar['payment:visa']" class="fa fa-cc-visa"></i>
              <i class="fa fa-cc-visa fa-disabled"  v-else></i>
              <i v-if="bar['payment:mastercard']" class="fa fa-cc-mastercard"></i>
              <i class="fa fa-cc-mastercard fa-disabled"  v-else></i>
              <i v-if="bar['payment:american_express']" class="fa fa-cc-amex"></i>
              <i class="fa fa-cc-amex fa-disabled"  v-else></i>
              <i v-if="bar['payment:discover_card']" class="fa fa-cc-discover"></i>
              <i class="fa fa-cc-discover fa-disabled"  v-else></i>
          </h3>

          <div slot="body">
              <div role="tabpanel">
                      <!-- Nav tabs -->
                      <ul class="nav nav-tabs" role="tablist">

                          <li role="presentation" class="active"><a href="#uploadTab" aria-controls="uploadTab" role="tab" data-toggle="tab">Detalles</a>
                          </li>

                          <li v-if="roles.includes('owner') && isOwnedOrNot"  role="presentation"><a href="#browseTab" aria-controls="browseTab" role="tab" data-toggle="tab">Editar </a>
                          </li>

                      </ul>
                      <!-- Tab panes -->
                      <div class="tab-content" >
                          <div role="tabpanel" class="tab-pane active" id="uploadTab">
                              <table>
                                  <tr v-if="bar['addr:street']">
                                      <td>
                                          <p>
                                              <img class="map-icons animated bounceInDown" src="static/icons/map/map.svg" alt="address">

                                              {{bar['addr:street']}} <span v-if="bar['addr:housenumber']">{{bar['addr:housenumber']}}</span>
                                          </p>
                                      </td>
                                  </tr>

                                  <tr v-if="bar['contact:facebook']">
                                      <td >
                                          <p>
                                              <img class="map-icons " src="static/icons/modal/facebook.svg" alt="facebook">

                                              <a v-bind:href="linkFB" target="_blank">
                                                  Me gusta!.
                                              </a>

                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.website">
                                      <td>
                                          <p>
                                              <img class="map-icons " src="static/icons/modal/website.svg" alt="website">
                                              <a v-bind:href="linkWS" target="_blank">
                                                  Visita nuestra página web.
                                              </a>
                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.phone">
                                      <td >
                                          <p>
                                              <img class="map-icons animated tada" src="static/icons/modal/phone.svg" alt="phone">
                                              <a  v-bind:href="tlf" target="_blank">
                                                  Llámanos!
                                              </a>
                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.email">
                                      <td >
                                          <p>
                                              <img class="map-icons animated jackInTheBox " src="static/icons/modal/email.svg" alt="phone">
                                              <a  v-bind:href="email" target="_blank">
                                                  Escríbenos!
                                              </a>
                                          </p>
                                      </td>
                                  </tr>
                                  <tr v-if="bar.cuisine">
                                      <td >
                                          <p>
                                              <img class="map-icons animated jackInTheBox " src="static/icons/modal/cuisine.svg" alt="phone">
                                              <a  v-bind:href="cuisine" target="_blank">
                                                  {{bar.cuisine}} cuisine.
                                              </a>
                                          </p>
                                      </td>
                                  </tr>


                                  <tr>
                                      <p>
                                          <img src="static/icons/modal/owner.svg" class="map-icons animated swing" alt="">
                                          <a @click="claimModal(true)">
                                              Reclamar bar
                                          </a>
                                      </p>
                                  </tr>
                              </table>
                          </div>
                          <div  v-if="roles.includes('owner')" role="tabpanel" class="tab-pane" id="browseTab">

                              <input-tag :on-change="test" :tags.sync="keys"></input-tag>

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
              <button class="btn btn-danger" @click="closeModalAction">
                  Cerrar
              </button>
              <br>
              <br>

          </div>
      </modal-view>


      <modal-view v-bind:class="claimModalAnimation" v-if="claimModalStatus" @close="claimModal = false">
          <div slot="header">
              <a class="pull-right" @click="closeModal('claim')">
                  <img  class="close-icon animated slideInTop" src="static/icons/menu/close.svg" alt="">
              </a>
              <br>
              <h1>Reclamar establecimiento</h1><br>
                  Kampai

          </div>
          <div slot="body" v-if="claimSent === false">
              <div id="newbar-form">
                  <div class="newbar-content">
                      <form v-if="claimSent === false">
                          <label>Nombre:</label><br>
                          <input type="text" name="nombre" placeholder="Name"><br>
                          <label>Direccion:</label><br>
                          <input type="text" name="direccion" placeholder="Direction"><br>
                          <label for="exampleInputFile">Documentación</label>
                          <input type="file" id="exampleInputFile">
                          <br>
                          <input @click="sendClaim"  type="button" class="newbar newbar-button" value="Añadir bar" name="newbar">

                          <label v-if="alreadyClaimed" >El establecimiento ya pertenece a otro usuario.</label>
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
import store  from './store/store.js'

import OsmMap from './components/OsmMap.vue';
import SideBar from './components/SideBar.vue';
import InputTag from 'vue-input-tag'

export default
{
    name: 'App',
    components: {OsmMap,SideBar,InputTag},


    data ()
    {
        return {
            claimSent: false,
            flipIn: 'animated flipInY',
            rotateIn: 'animated rotateIn',
            alreadyClaimed: false,
            bar_keywords: ['test']
        }
    },

    methods:
    {
        test: function(){console.log('all');},

        ...mapActions({
           updateBars : 'updateBarsAction',
           updateBarDetails: 'updateBarDetailsAction',
           updateModal: 'updateModalAction',
           plotRouteAction:  'plotRouteAction',
           odLayer: 'openDataLayerAction',
           addBarToSubs: 'addBarToSubsAction',
           removeBarFromSubs: 'removeBarFromSubs',
           claimModalAction: 'claimModalAction',
           sideBarAction: 'sideBarAction',
           claimBarAction: 'claimBarAction'

        }),

        addBarToSubsIfLoggedIn: function (bar)
        {
            if(this.user !== '')
            {
                this.addBarToSubs(bar);
                return;
            }

            this.pushLoginRequired('bar');

        },

        closeModal: function (modal)
        {
            switch(modal){
                case 'bar':
                    this.updateModal(false);
                    break;
                case 'claim':
                    this.claimModalAction(false);
                    break;
                case 'all':
                    this.claimModalAction(false);
                    this.updateModal(false);
                    break;
            }
        },

        //close modal and open login with error flash.
        pushLoginRequired: function(modal)
        {
            this.closeModal(modal);

            this.sideBarAction('open');
            this.$router.push({
                name:'login',
                params: {
                    loginRequired: true
                }
            });
        },

        plotRoute: function(profile)
        {

            // this.updateModal(false);
            this.closeModalAction('bar');

            this.plotRouteAction(profile);
            // this.updateBarDetails('');
            this.sideBarAction('close');
        },

        claimModal: function(bool)
        {
            this.claimSent = false;
            this.claimModalAction(bool);
        },

        sendClaim: function()
        {
            if(this.user !== '')
            {
                this.claimBarAction().then((res_code) =>
                {
                    this.claimSent = true;
                    console.log('From app then: ' + res_code);
                    this.closeModalAction('all');
                    this.sideBarAction('open');
                    this.$router.push({name:'owned_bars'})
                }).catch((err_res_code) =>
                {
                    console.log('From app err: ' + err_res_code);
                    switch(err_res_code)
                    {
                        case 401:
                            this.alreadyClaimed = true;
                            break;
                        case 409:
                            this.closeModal('all');
                            this.sideBarAction('open');
                            this.$router.push({
                                name:'owned_bars',
                                params: {
                                    youOwnIt: true
                                }
                            });

                            break;
                    }
                });
                return;
            }

            this.pushLoginRequired('all');


        },

        closeModalAction : function()
        {
            this.updateModal(false);
            this.sideBarAction('open');

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
                event.preventDefault();
            }
        },

        updateBarsAndRoute: function ()
        {
            this.updateBars();
            this.sideBarAction('open');
            this.$router.push({name: 'bar_list'});
        },

        setBarDetails: function(details)
        {
            this.updateBarDetails(details);
            this.updateModal(true);
            this.sideBarAction('close');


        },

        openDataLayer: function ()
        {
            //TODO
            this.odLayer();
        },

    },

    watch:
    {
        barKeywords: function(){console.log('changed');}
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
                isOwnedOrNot: 'currentIsBarOwned',
                user: 'currentUser',
                barKeywords: 'currentBarKeywords'
            }),
        modalAnimation: function ()
        {
            return this.modal ? this.flipIn : '';
        },

        claimModalAnimation: function()
        {
            return this.claimModalStatus ? this.rotateIn : '';
        },
        //custom get and set , must studie in detail very preciousss
        //this binds my tag manager with the storage value.
        keys: {
          get: function()
          {
              return store.state.bar_owner_storage.barKeywords;
          },

          set: function(array)
          {
              store.dispatch('updateCurrentAndMerge', array)
          }

        },

        // barKeywords: function()
        // {
        //     if(this.bar.keywords !== null)
        //     {
        //         return this.bar.keywords.split(';');
        //     }
        // },

        //Social network links.
        linkFB: function(){ return this.bar['contact:facebook'];},
        linkWS: function(){ return this.bar.website;},
        tlf: function(){return 'tel:'+this.bar.phone;},
        email: function(){return 'mailto:' + this.bar.email},
        cuisine: function(){return 'https://www.google.es/?q='+this.bar.cuisine+'+cuisine';}

    },

}


</script>

