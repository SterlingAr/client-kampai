<template>
    <div class="col-lg-12 col-sm-12 animated fadeInLeft">
        <div class="card hovercard">
            <div class="card-background">
                <img class="card-bkimg" alt="" src="static/icons/profile/photo.svg">
            </div>
            <div class="useravatar">

                <img alt="" src="static/icons/profile/photo.svg">

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
                <button type="button" id="owned-bars" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
                    <div class="hidden-xs">Favoritos</div>
                </button>
            </div>
        </div>

        <div class="well">
            <div class="tab-content">

                <div class="tab-pane fade in" id="tab1">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dicta doloribus dolorum, earum facere facilis impedit magnam necessitatibus omnis reprehenderit veniam voluptate! Dolorum ea iusto nam nesciunt provident quae unde!
                </div>
                <div class="tab-pane fade in" id="tab2">
                    <h3>Favorites</h3>
                    <div id="bar-items" class="list-group animated fadeInLeft">
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
        <div id="login-form">
            <form>
                <input id="logout" type="button" name="login" class="login login-button" value="Salir" @click="logoutorFail()">
            </form>
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

                logoutorFail: function () {
                    this.logout();
                },

                // copy paste from BarList ,should be refactored.
                showModal: function (bar) {
                    //update store object
                    let barDetails = bar.tags;
                    barDetails.coord = {};
                    barDetails.coord.lat = bar.lat;
                    barDetails.coord.lon = bar.lon;
                    barDetails.node = bar.id;
                    this.barDetails(barDetails);
                    this.updateModal(true);

                },


                //checks if bar is in current user's subscriptionlist

                ...mapActions({
                    logout: 'logOutAction',
                    barDetails: 'updateBarDetailsAction',
                    updateModal: 'updateModalAction',
                })

            },



            computed:
            {
                ...mapGetters({
                    user: 'currentUser',
                    subscriptions: 'currentSubscriptions',
                }),

            }

    }

</script>