<template>
    <div>
        <h3 class="h1" >Results</h3>

        <div id="bar-items" class="list-group">
            <div v-for="bar in bars" >
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
</template>

<script>


    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    export default
    {
        name: 'bar_list',

        mounted() {

        },

        data () {
            return {

            }
        },

        methods: {

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

            ...mapActions({
                barDetails: 'updateBarDetailsAction',
                updateModal: 'updateModalAction'
            })

        },

        computed: {

            ...mapGetters({
                bars: 'currentBars',
            })
        }
    }
</script>