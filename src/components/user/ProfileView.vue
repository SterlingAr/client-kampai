<template>
    <div class="col-lg-12 col-sm-12">
        <div class="card hovercard">
            <div class="card-background">
                <img class="card-bkimg" alt="" src="https://lorempixel.com/100/100/people/9/">
                <!-- http://lorempixel.com/850/280/people/9/ -->
            </div>
            <div class="useravatar">
                <img alt="" src="https://lorempixel.com/100/100/people/3/">
            </div>
            <div class="card-info"> <span class="card-title">{{user.name}}</span>

            </div>
        </div>
        <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">

            <div class="btn-group" role="group">
                <button type="button" id="following" class="btn btn-default" href="#tab1" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                    <div class="hidden-xs">Me</div>
                </button>
            </div>

            <div class="btn-group" role="group">
                <button type="button" id="favorites" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
                    <div class="hidden-xs">Favorites</div>
                </button>
            </div>
        </div>

        <div class="well">
            <div class="tab-content">
                <div class="tab-pane fade in active" id="tab1">
                    <p>
                        <router-link :to="{name:'newbar'}">Añade tu bar</router-link>
                    </p>
                </div>
                <div class="tab-pane fade in" id="tab2">
                    <h3>Favorites</h3>
                    <div id="bar-items" class="list-group">
                        <div v-for="bar in subscriptions" >
                            <a @click="showModal(bar)" v-if="bar.tags.name !== '' " class="list-group-item active">
                                <img v-if="bar.tags.amenity === 'cafe'"  class="bar-list pull-right" src="static/icons/list/coffee.svg" alt="" >
                                <img v-if="bar.tags.amenity === 'bar'"  class="bar-list pull-right" src="static/icons/list/beer.svg" alt="" >
                                <img v-if="bar.tags.amenity === 'restaurant'"  class="bar-list pull-right" src="static/icons/list/restaurant.svg" alt="" >
                                <img v-if="bar.tags.amenity === 'fast_food'"  class="bar-list pull-right" src="static/icons/list/hamburger.svg" alt="" >

                                <h4  class="h4 list-group-item-heading">{{bar.tags.name}}
                                </h4>
                                <p v-if="bar.tags.description !== '' " class="list-group-item-text">{{bar.tags.description}}</p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default
    {

        data ()
        {
            return {

            }
        },

        methods:
        {
            //copy paste from BarList ,should be refactored.
            showModal: function(bar)
            {
                //update store object
                let barDetails = bar.tags;
                barDetails.coord = {};
                barDetails.coord.lat = bar.lat;
                barDetails.coord.lon = bar.lon;

                this.barDetails(barDetails);
                this.updateModal(true);

            },

            //checks if bar is in current user's subscriptionlist

            ...mapActions({
                barDetails: 'updateBarDetailsAction',
                updateModal: 'updateModalAction',
            })

        },

        computed:
        {
            ...mapGetters({
                user: 'currentUser',
                subscriptions: 'currentSubscriptions',
                modal: 'currentModal',

            })

        }


    }


</script>