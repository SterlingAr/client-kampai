
<template>
   <div id="login-form">
       <div v-if="roles.includes('nouser')" class="login-card  animated slideInLeft">
           <h1>Entrar</h1><br>
           <form>
               <input v-validate="{required: true, email:true}"   type="text" name="email" placeholder="Email" @input="updateEmail">
               <input v-validate="{required: true, min:6, max:15}" type="password" name="password" placeholder="Password" @input="updatePassword">
               <input type="button" name="login" class="login login-button" value="Login" @click="loginOrFail">
           </form>

           <div class="login-help">
               <router-link :to="{name:'register'}">¿No tienes cuenta? Registrate gratis! </router-link>
           </div>

       </div>

       <div  v-if="authStatus === 200">

           <div class="alert alert-success animated bounceOutRight">
               <strong>Redireccionando...</strong>
           </div>

       </div>

       <div :class="errorIn" v-if="authStatus === 401">

           <div class="alert alert-danger">
               <strong>Credenciales erróneas</strong> Verifique su usuario y contraseña.
           </div>

       </div>
       <div v-if="loginRequired">

           <div class="alert alert-danger" :class="errorIn" >
               <strong>Es necesario iniciar sesión</strong>
           </div>

       </div>

       <div v-if="errors.any()">
           <div v-show="errors.has('email')" :class="errorIn"  class="alert alert-danger">
               <strong>ERROR</strong> {{ errors.first('email') }}
           </div>

           <div v-show="errors.has('password')" :class="errorIn"  class="alert alert-danger">
               <strong>ERROR</strong> {{ errors.first('password') }}
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
                errorIn: 'animated slideInRight',
            }
        },


        methods: {


            ...mapActions(
            {
                bindEmail: 'updateEmailAction',
                bindPassword: 'updatePasswordAction',
                login: 'loginAction'
            }),

            updateEmail: function(event)
            {
                this.bindEmail(event.target.value);
            },

            updatePassword: function(event)
            {
                this.bindPassword(event.target.value);
            },


            loginOrFail: function()
            {
                this.login();
            },
        },

        computed:
        {

            ...mapGetters(
            {
                authStatus: 'currentAuthStatus',
                roles : 'currentRole',
            }),

        },

        props: ['loginRequired']

    }


</script>