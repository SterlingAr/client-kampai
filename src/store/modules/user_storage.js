import axios from 'axios';

const state =
{
    user: {
        name: 'Carrot',
    },
    subscriptions: '',

}

const getters =
{
    currentUser: state =>
    {
        return state.user;
    },

    currentSubscriptions: state =>
    {
        return state.subscriptions;
    }


}

const mutations =
{
    updateUser: (state,userData) =>
    {
        state.user = userData;
    },

    updateSubscriptions: (state,subscriptions) =>
    {
        state.subscriptions = subscriptions;
    }


}

const actions =
{

    updateUserAction: ({commit}, user) =>
    {

    },

    updateSubsAction: ({commit}, subs) =>
    {

    },

    addBarToSubsAction: ({commit,state,rootState},bar) =>
    {

        console.log(rootState.auth_storage.token);
        console.log(state.user.id);
        console.log(bar.node);

        axios.post(rootState.api_base_uri + '/api/auth/subscription/bar',
        {


            node: bar.node,
            user_id: state.user.id,

        },

        {
            headers: {
                Authorization: rootState.auth_storage.token,
            },
        }).then((response) =>
        {
            commit('updateSubscriptions', response.data.subscription_list);
            console.log(response);
            if(response.status === 409)
            {

            }

        }).catch((error) =>
        {
            console.log(error);
        });


    }



}

export default {
    state,
    getters,
    mutations,
    actions
}