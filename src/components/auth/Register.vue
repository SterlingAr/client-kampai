<template>

    <div id="login-form">
        <div class="login-card">
            <h1>Registro</h1><br>
            <form>
                <input v-validate="{required: true,alpha:true}" type="text" name="name" placeholder="Nombre" @input="updateName">
                <input v-validate="{required: true, email:true}" type="text" name="email" placeholder="Email" @input="updateEmail">
                <input v-validate="{required: true, min:6, max:15}"  type="password" name="password" placeholder="Contraseña" @input="updatePassword">
                <input type="button" name="login" class="login login-button" value="Crear cuenta" @click="registerOrFail">
            </form>
        </div>

        <div v-if="errors.any()">

            <div v-show="errors.has('name')" :class="errorIn"  class="alert alert-danger">
                <strong>ERROR</strong> {{ errors.first('name') }}
            </div>


            <div v-show="errors.has('email')" :class="errorIn"  class="alert alert-danger">
                <strong>ERROR</strong> {{ errors.first('email') }}
            </div>

            <div v-show="errors.has('password')" :class="errorIn" class="alert alert-danger">
                <strong>ERROR</strong> {{ errors.first('password') }}
            </div>
        </div>
    </div>

</template>


<script>

    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: 'Register',

        data() {
            return {
                errorIn: 'animated slideInRight',

            }
        },


        methods: {


            ...mapActions(
                {
                    bindEmail: 'updateEmailAction',
                    bindPassword: 'updatePasswordAction',
                    bindName: 'updateNameAction',
                    register: 'registerAction'
                }),

            //custom methods to update storage values
            updateEmail: function (event) {
                this.bindEmail(event.target.value);

            },

            updatePassword: function (event) {
                this.bindPassword(event.target.value);
            },

            updateName: function (event)
            {
                this.bindName(event.target.value);

            },

            registerOrFail: function () {
                this.register();
                if(this.authStatus === 201)
                {
                    this.$router.push({
                        name: 'profile'
                    });
                }

            }

        },
        computed:
            {

                ...mapGetters({

                    authStatus: 'currentAuthStatus',
                }),

            }
    }

</script>