import axios from 'axios'

const state =
{
    email: '',
    password: '',
    name: '',
    role: ['nouser'],
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
    },

    currentName: state =>
    {
        return state.name;
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
    },

    updateName: (state,name) =>
    {
        state.name = name;
    }


}
const actions =
{
    registerAction: ({commit},rootState) =>
    {
        axios.post(rootState.api_base_uri + '/api/auth/register' , {

            name: state.name,
            email: state.email,
            password: state.password

        })
            .then((response) => {

                console.log(response);


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

    },

    updateNameAction: ({commit}, name) =>
    {
        commit('updateName', name);
    }

}


export default {
    state,
    getters,
    mutations,
    actions
}