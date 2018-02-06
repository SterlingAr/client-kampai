
<!--<template>-->
    <!--<div>-->
        <!--<table class="table table-hover" id="feature-list">-->
            <!--<thead>-->
            <!--<tr>-->
                <!--<th>User</th>-->
                <!--<th>Role</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody v-for="user in users">-->
            <!--<tr v-for="role in roles">-->
                <!--<td>@{{user.name}}</td>-->
                <!--<td>@{{role.name}}</td>-->
                <!--<td><button @click="deleteUser(user.id)">Borrar</button></td>-->
            <!--</tr>-->
            <!--</tbody>-->
        <!--</table>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import axios from 'axios';-->
    <!--export default {-->
        <!--name:'users',-->
        <!--data(){-->
            <!--return {-->
                <!--users: [],-->
                <!--roles: []-->
            <!--}-->
        <!--},-->
        <!--created: function() {-->
            <!--this.getUsers();-->
            <!--this.getRoles();-->
        <!--},-->
        <!--methods: {-->
            <!--getUsers: function(rootState)-->
            <!--{-->
                <!--axios.get(rootState.api_base_uri+'/api/users').then( (response) => {-->
                    <!--let users = response.data;-->
                    <!--users.forEach( (user) => {-->
                        <!--this.users.push(user);-->
                    <!--});-->
                <!--}).catch( (error) => {-->
                    <!--console.log(error);-->
                <!--});-->
            <!--},-->
            <!--getRoles: function(rootState)-->
            <!--{-->
                <!--axios.get(rootState.api_base_uri+'/api/roles').then( (response) => {-->
                    <!--let roles = response.data;-->
                    <!--roles.forEach( (role) => {-->
                        <!--this.roles.push(role);-->
                    <!--});-->
                <!--}).catch( (error) => {-->
                    <!--console.log(error);-->
                <!--});-->
            <!--},-->
            <!--deleteUser: function(rootState,userId)-->
            <!--{-->
                <!--console.log(rootState.api_base_uri+'/api/users/'+userId);-->
                <!--axios.delete(rootState.api_base_uri+'/api/users/'+userId).then((response)=>{-->
                    <!--console.log('api/users/'+userId);-->
                    <!--console.log(response);-->
                    <!--alert("Has eliminado el usuario con id "+userId);-->
                <!--}).catch( (error) => {-->
                    <!--console.log(error);-->
                <!--});-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->