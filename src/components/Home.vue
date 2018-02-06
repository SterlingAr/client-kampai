<template>
    <div class="sidebar-pane" >
        <h1 class="sidebar-header">
            Kampai
        <span class="sidebar-close"><i class="fa fa-caret-left"></i></span>
        </h1>
        <p align="center" class="description">
            Kampai es una aplicación que dada una palabra clave como(pizza, kebab),
            te muestra los bares cercanos a ti que tienen lo que deseas beber o comer.
            Tambien puedes buscar si ofrece los servicios que necesites (silla de ruedas,wifi...).
            <br><br>
            Ademas aparte de eso te localiza en el mapa y luego te muestra el camino para llegar al bar que
            has seleccionado.
            <br><br>
            Si tienes un bar y quieres incluirlo en nuestra aplicacion <router-link :to="{name:'register'}">Registrate</router-link>
        </p>

        <div align="center" class="footer">
            <p class="social" >Consulta nuestras redes sociales</p>
            <ul>
                <a href="http://www.facebook.com" target="_blank" class="icons"><span class="fa fa-facebook"></span> </a>
                <a href="http://twitter.com" target="_blank" class="icons"><span class="fa fa-twitter"></span> </a>
                <a href="http://www.instagram.com" target="_blank" class="icons"><span class="fa fa-instagram"></span> </a>
            </ul>
            <ul>Si tienes alguna duda <router-link :to="{name:'contact'}">Contacta con nosotros</router-link></ul>
        </div>
    </div>
</template>


<script>

    export default
    {
        name:'Home',


    }

</script>