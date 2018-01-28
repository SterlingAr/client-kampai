<template>
    <!--<div class="sidebar-pane" id="profile">-->
    <!--<h1 class="sidebar-header">Profile<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->

    <!--</div>-->
    <div>
        Nada yet.
        {{user.name}}

        <ul v-for="bar in subscriptions">

            <li>{{bar.name}}</li>

        </ul>

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



        },

        computed:
        {
            ...mapGetters({
                user: 'currentUser',
                subscriptions: 'currentSubscriptions'
            })

        }


    }


</script>