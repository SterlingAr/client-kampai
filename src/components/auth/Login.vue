
<template>
   <div id="login-form">
       <div class="login-card">
           <h1>Log-in</h1><br>
           <form>
               <input type="text" name="user" placeholder="Username" @input="updateEmail">
               <input type="password" name="pass" placeholder="Password" @input="updatePassword">
               <input type="button" name="login" class="login login-button" value="login" @click="loginOrFail">
           </form>

           <div class="login-help">
               <router-link :to="{name:'register'}">Register</router-link> • <a href="#">Forgot Password</a>
           </div>
       </div>
   </div>

</template>

<script>

    import {mapGetters,mapActions} from 'vuex'

    export default
    {
        name: 'Login',

        data () {
            return {

            }
        },


        methods: {

            // ...mapGetters({}), if needed ,put it in computed

            ...mapActions(
            {
                bindEmail: 'updateEmailAction',
                bindPassword: 'updatePasswordAction',
                login: 'loginAction'
            }),

            updateEmail: function(event)
            {
                console.log(event.target.value);
                this.bindEmail(event.target.value);

            },

            updatePassword: function(event)
            {
              console.log(event.target.value);
                this.bindPassword(event.target.value);
            },

            loginOrFail: function()
            {
                this.login();

                this.$router.push({
                    name:'profile'
                });
            }


        }

    }


</script>