<template>
    <div>
        <form>
            <label>Usuario:</label><br>
            <input type="text" name="usuario" placeholder="Username"><br>
            <label>Contraseña:</label><br>
            <input type="password" name="contraseña" placeholder="Password"><br>
            <label>Mensaje:</label><br>
            <textarea name="textarea"></textarea><br>
            <button>Enviar</button>
        </form>
    </div>

</template>

<script>
    export default{
        name: 'Contact',

    }
</script>