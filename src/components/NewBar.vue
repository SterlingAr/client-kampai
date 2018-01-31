<template>
    <div id="newbar-form">
        <div class="newbar-content">
            <h1>Bar nuevo</h1><br>
            <form>
                <label>Nombre:</label><br>
                <input type="text" name="nombre" placeholder="Name"><br>
                <label>Direccion:</label><br>
                <input type="text" name="direccion" placeholder="Direction"><br>
                <label>Number:</label><br>
                <input type="number" placeholder="Number" name="number"><br>
                <label>Keywords:</label><br>
                <textarea name="textarea"></textarea><br>
                <input type="button" class="newbar newbar-button" value="Añadir bar" name="newbar" @click="addBar">
            </form>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'NewBar',

        methods: {
           addBar: function(){
               alert("Tu bar ha sido añadido correctamente!");
           }
        }
    }
</script>