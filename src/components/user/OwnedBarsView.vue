<template>
    <div>
        <h3 class="h1" >Mis establecimientos</h3>

        <div v-if="youOwnIt">
            <div class="alert alert-danger animated slideInLeft">
                <strong>El establecimiento ya te pertenece.</strong>
            </div>
        </div>

        <div id="bar-items" class="list-group">
            <div v-for="bar in owned_bars"  class="animated fadeInLeft">
                <a @click="showModal(bar)" v-if="bar.tags.name !== '' "  class="list-group-item active">
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
</template>


<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {


        methods:
        {
            showModal: function(bar)
            {
                //update store object
                this.updateModal(true);
                this.active = true;
                let barDetails = bar.tags;
                barDetails.coord = {};
                barDetails.coord.lat = bar.lat;
                barDetails.coord.lon = bar.lon;
                barDetails.node = bar.id;
                barDetails.keywords = bar.keywords;
                if(bar.keywords !== null)
                {
                    this.splitKeywords(bar.keywords);
                }
                else
                {
                    this.splitKeywords('');
                }
                this.barDetails(barDetails);
                this.sideBarAction('close');
            },


            ...mapActions({
                barDetails: 'updateBarDetailsAction',
                updateModal: 'updateModalAction',
                sideBarAction: 'sideBarAction',
                splitKeywords: 'barKeywordsSplitAction'
            })
        },
        computed:
        {

            ...mapGetters({
                owned_bars : 'currentOwnedBars'
            })

        },

        props: ['youOwnIt']

    }

</script>