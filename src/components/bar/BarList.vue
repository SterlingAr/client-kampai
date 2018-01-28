<template>
    <div>
        <h3 >Results</h3>
        <ul v-if="bars.length" class="list-group" v-for="bar in bars">
            <li  class="list-group-item list-group-item-dark">
                <span>
                    <i v-if="bar.tags.amenity === 'bar'" class="fa fa-beer" aria-hidden="true"></i>
                    <i v-if="bar.tags.amenity === 'restaurant'" class="fa fa-cutlery" aria-hidden="true"></i>
                    <i v-if="bar.amenity === 'cafe'" class="fa fa-coffee" aria-hidden="true"></i>

                </span>
                {{bar.tags.name}}

            </li>
        </ul>
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

            ...mapActions({
                showModal: 'updateBarModalAction'
            })



        },

        computed: {

            ...mapGetters({
                bars: 'currentBars',
            })
        }
    }
</script>