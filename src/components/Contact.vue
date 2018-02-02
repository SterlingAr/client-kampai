<template>
    <div id="contact-form">
        <div class="contact-content">
            <h1>Contacto</h1><br>
            <form>
                <label>Nombre:</label><br>
                <input type="text" name="nombre" placeholder="Name"><br>
                <label>Email:</label><br>
                <input type="email" name="email" placeholder="Email"><br>
                <label>Mensaje:</label><br>
                <textarea name="textarea"></textarea><br>
                <input type="button" class="contact contact-button" value="Enviar">
            </form>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Contact',

        data() {
            return {}
        },
        methods: {

            // ...mapGetters({}), if needed ,put it in computed

//            ...mapActions(
//                {
//                    bindName: 'updateNameAction',
//                    bindEmail: 'updateEmailAction',
//                    contact: 'contactAction'
//                }),

            updateEmail: function (event) {
                console.log(event.target.value);
                this.bindEmail(event.target.value);

            },

            updateName: function (event) {
                console.log(event.target.value);
                this.bindPassword(event.target.value);
            },

            loginOrFail: function () {
                this.login();

                this.$router.push({
                    name: 'profile'
                });
            },


        }
    }
</script>