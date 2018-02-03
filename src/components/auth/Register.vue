<template>

    <div id="login-form">
        <div class="login-card">
            <h1>Register</h1><br>
            <form>
                <input type="text" name="user" placeholder="Name" @input="updateName">
                <input type="text" name="user" placeholder="Username" @input="updateEmail">
                <input type="password" name="pass" placeholder="Password" @input="updatePassword">
                <input type="button" name="login" class="login login-button" value="Register" @click="registerOrFail">
            </form>


        </div>
    </div>

</template>


<script>

    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: 'Register',

        data() {
            return {}
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