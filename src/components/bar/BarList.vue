<template>
    <div>

        <h3 class="h1" >Resultados de su búsqueda</h3>
        <div id="bar-items" class="list-group">
            <!--class="animated fadeInLeft"-->
            <div v-for="bar in bars" >
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
    export default
    {
        name: 'bar_list',

        mounted() {

        },

        data () {
            return {

                active: false,

            }
        },

        methods: {

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

                this.barDetails(barDetails);
                this.sideBarAction('close');
            },

            ...mapActions({
                barDetails: 'updateBarDetailsAction',
                updateModal: 'updateModalAction',
                sideBarAction: 'sideBarAction',

            })

        },

        computed: {

            ...mapGetters({
                bars: 'currentBars',
            }),

        }
    }
</script>