<template>

    <div class="sidebar-content">

        <router-view></router-view>


        <router-view name="bar_list_view"></router-view>

        <router-view name="login_view"></router-view>

        <router-view name="profile_view"></router-view>

        <router-view name="register_view"></router-view>

        <router-view name="contact_view"></router-view>

        <router-view name="newbar_view"></router-view>



        <!--<div class="sidebar-pane" id="home">-->

            <!--<h1 class="sidebar-header">-->
                <!--sidebar-v2-->
                <!--<span class="sidebar-close"><i class="fa fa-caret-left"></i></span>-->
            <!--</h1>-->
        <!--</div>-->

        <!--<div class="sidebar-pane" id="profile">-->
             <!--<h1 class="sidebar-header">Profile<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
            <!--<router-view name="user-profile"></router-view>-->
        <!--</div>-->

        <!--<div class="sidebar-pane" id="messages">-->
            <!--<h1 class="sidebar-header">Messages<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
        <!--</div>-->

        <!--<div class="sidebar-pane" id="settings">-->
            <!--<h1 class="sidebar-header">Settings<span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1>-->
        <!--</div>-->


    </div>

</template>


<script>


    export default
    {

    }

</script>