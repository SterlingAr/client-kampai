import axios from 'axios';

const state =
{
    user: '',
    subscriptions: [],
    owned_bars: []


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
    },

    currentOwnedBars: state =>
    {
        return state.owned_bars;
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
    },

    updateOwnedBars: (state, owned_bars) =>
    {
        state.owned_bars = owned_bars;
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

    addBarToSubsAction: ({commit,state,rootState,dispatch},bar) =>
    {


        axios.post(rootState.api_base_uri + '/api/auth/subscription/bar',
        {
            node: bar.node,
            user_id: state.user.id,
        },

        {
            headers: {
                Authorization: ' Bearer ' + rootState.auth_storage.token,
            },
        }).then((response) =>
        {
            //set isBarInUserList to false in order for the heart to change.
            dispatch('updateHeartStatus',true);

            commit('updateSubscriptions', response.data.subscription_list.elements);
            console.log(response);
            if(response.status === 409)
            {

            }

        }).catch((error) =>
        {
            console.log(error);
        });
    },

    removeBarFromSubs: ({commit,dispatch,state,rootState},bar) =>
    {

        axios.delete(rootState.api_base_uri + '/api/auth/subscription/bar/remove/'+bar.node+'/'+state.user.id,

            {
                headers: {
                    Authorization: ' Bearer ' + rootState.auth_storage.token,
                },
            }).then((response) =>
        {
            console.log(response);

            if(response.data.subscription_list !== undefined)
            {
                dispatch('updateHeartStatus',false);

                commit('updateSubscriptions', response.data.subscription_list.elements);
                console.log(response);
            }



        }).catch((error) =>
        {
            console.log(error);
        });
    },

    claimBarAction: ({commit,state,rootState,dispatch}) =>
    {

        axios.post(rootState.api_base_uri + '/api/auth/claim',
            {
                node: rootState.bar_storage.barDetails.node,
                user_id: state.user.id,
            },
            {
                headers: {
                    Authorization: ' Bearer ' + rootState.auth_storage.token,
                },

            }).then((response) =>
            {
                console.log(response);
                if(response.status === 200)
                {
                    commit('updateOwnedBars', response.data.bars_owned);
                }


            }).catch((error)=>
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