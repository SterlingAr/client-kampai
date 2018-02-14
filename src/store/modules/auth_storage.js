import axios from 'axios'

const state =
{
    email: '',
    password: '',
    name: '',
    authStatus: false,
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
    },

    currentAuthStatus: state =>
    {
        return state.authStatus;
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
    },

    updateAuthStatus: (state,newStatus) =>
    {
        state.authStatus = newStatus;
    }


}
const actions =
{

    //Rellenar campos, name, email, contraseña
    //Validar que los datos están bien introducidos.
    registerAction: ({commit,dispatch,rootState}) =>
    {
        axios.post(rootState.api_base_uri + '/api/auth/register' , {
            name: state.name,
            email: state.email,
            password: state.password
        })
            .then((response) => {
                /**
                 * User created : 201 Created
                 * User already exists: 409 Conflict.
                 */
                if(response.status === 201) //
                {
                    //no need for login, later substitute the user in state.
                    dispatch('loginAction');
                }

            console.log(response);

            })
            .catch((error) => {
                commit('updateAuthStatus',response.status);
                console.log(error);
            });
    },

    updateRolesAction: ({commit},response_roles) =>
    {
        let roles = [];
        response_roles.forEach(function (role)
        {
            roles.push(role.name);
        });
        commit('updateRole', roles);
    },

    loginAction:({commit,state,rootState,dispatch}) =>
    {

        axios.post(rootState.api_base_uri + '/api/auth/login', {

            email: state.email,
            password: state.password,

        }).then((response) =>{

            console.log(response);

            //If
            if(response.status === 200)
            {
                commit('updateAuthStatus', response.status);

                //fill necessary states for future usage
                // let bearer_token = ' Bearer ' + response.data.token;

                commit('updateToken',response.data.token);
                commit('updateUser',response.data.user);

                if(response.data.user.subscription)
                {
                    commit('updateSubscriptions',response.data.user.subscription.elements);
                    //empty form fields.
                }

                dispatch('updateRolesAction',response.data.user.roles);
                commit('updateOwnedBars', response.data.user.bars_owned);


                //chapuza... :(
                App.$router.push({
                    name:'profile'
                });

                /**
                 * Logged in:  200 OK
                 * Bad credentials: 401 Unauthorized
                 *
                 */
            }

            // else
            // Display error on screen
        }).catch((error) => {
            console.log(error);
            commit('updateAuthStatus', 401);
            commit('updatePassword','');
            commit('updateEmail','');
            return false;
        })
    },

    logOutAction: ({rootState,commit}) =>
    {
        axios.get(rootState.api_base_uri+'/api/auth/logout?token='+state.token).then((response)=>{
            console.log(response);

            if(response.status===200){

                commit('updateToken', '');

                let roles = ['nouser'];

                commit('updateRole', roles);

                commit('updateUser','');

                let emptySub = [];
                commit('updateSubscriptions',emptySub);

                App.$router.push({
                    name:'home'
                });


            }
        }).catch((error)=>{
            console.log(error);
            // console.log(rootState.api_base_uri+'/api/auth/logout?token='+state.token);
        });
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
    },

    updateAuthStatusAction: ({commit}, status) =>
    {
        commit('updateAuthStatus',status);
    }

}


export default {
    state,
    getters,
    mutations,
    actions
}