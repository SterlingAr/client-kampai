<template>

    <div id="login-form">
        <div class="login-card">
            <h1>Register</h1><br>
            <form>
                <input type="text" name="user" placeholder="Username" @input="updateEmail">
                <input type="password" name="pass" placeholder="Password" @input="updatePassword">
                <input type="button" name="login" class="login login-button" value="login" @click="loginOrFail">
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

            // ...mapGetters({}), if needed ,put it in computed

            ...mapActions(
                {
                    bindEmail: 'updateEmailAction',
                    bindPassword: 'updatePasswordAction',
                    register: 'loginAction'
                }),

            updateEmail: function (event) {
                console.log(event.target.value);
                this.bindEmail(event.target.value);

            },

            updatePassword: function (event) {
                console.log(event.target.value);
                this.bindPassword(event.target.value);
            },

            registerOrFail: function () {
                this.login();

                this.$router.push({
                    name: 'profile'
                });
            }


        }
    }

</script>