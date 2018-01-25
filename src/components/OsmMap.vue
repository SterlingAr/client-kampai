<template>

    <div id="map" class="sidebar-map"></div>


</template>
<script>


    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default
    {
        name: 'OsmMap',
        mounted()
        {
            this.initMap();
        },

        methods:
        {
            ...mapActions(
            {
                initMap: 'initMapAction'
            })

        },

        computed:
        {
            ...mapGetters(
            {
                map: 'currentMap'
            }),
        }
    }

</script>


