import axios from 'axios'

const state =
{
    email: '',
    password: '',
    role: 'nouser',
    token: ''

}
const getters =
{
    currentPassword: state =>
    {
        return state.password;
    },

    currentEmail: state =>
    {
        return state.email;
    },

    currentRole: state =>
    {
        return state.role;
    }


}
const mutations =
{
    updatePassword: (state,password) =>
    {
        state.password = password;
    },

    updateEmail: (state,email) =>
    {
        state.email = email;
    },

    updateRole: (state,role) =>
    {
        state.role = role;
    },

    updateToken: (state,token) =>
    {
        state.token = token;
    }


}
const actions =
{
    registerAction: ({commit},rootState) =>
    {
        axios.post('/api/auth/register' , {

            name: this.name,
            email: this.email,
            password: this.password

        })
            .then((response) => {

                console.log(response);
                this.$router.push({path:'/bars'});


            })
            .catch((error) => {

                console.log(error);
            });
    },

    loginAction:({commit,rootState}) =>
    {

        axios.post(rootState.api_base_uri + '/api/auth/login', {

            email: state.email,
            password: state.password,

        }).then((response) =>{

            console.log(response);

            //If
            if(response.status === 200)
            {
                //display 'Login success' and redirect
                // this.$router.push(
                //     {
                //         name:'profile',
                //         params:
                //             {
                //                 user: this.user
                //             }
                //     });
                commit('updateUser',response.data.user);
                commit('updateRole', response.data.user.role);
                commit('updateSubscriptions',response.data.subscriptionList);
                commit('updateToken',response.data.token);

                commit('updatePassword','');
                commit('updateEmail','');
            }
            // else
            // Display error on screen
        }).catch((error) => {

            console.log(error);

        })
    },

    updatePasswordAction: ({commit}, password) =>
    {
        commit('updatePassword', password);
    },

    updateEmailAction: ({commit}, email) =>
    {
        commit('updateEmail', email);
    },

    updateRoleAction: ({commit},role) =>
    {

    }

}


export default {
    state,
    getters,
    mutations,
    actions
}