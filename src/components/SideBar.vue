<template>

    <div class="sidebar-content animated slideInLeft">
        <h1 class="sidebar-header ">
        Kampai
        <span class="sidebar-close">
        <a @click="sideBarAction('close')">
        <img  class="close-icon animated slideInTop" src="static/icons/menu/close.svg" alt="">
        </a>
        </span>
        </h1>

        <router-view></router-view>


        <router-view name="bar_list_view"></router-view>

        <router-view name="login_view"></router-view>

        <router-view name="profile_view"></router-view>

        <router-view name="owned_bars_view"></router-view>

        <router-view name="register_view"></router-view>

        <router-view name="contact_view"></router-view>

        <router-view name="newbar_view"></router-view>

        <!--<router-view name="admin_view"></router-view>-->


    </div>

</template>


<script>

    import {mapActions} from 'vuex';

    export default
    {
        methods:{
            ...mapActions({
                sideBarAction: 'sideBarAction'
            }),
        }
    }

</script>