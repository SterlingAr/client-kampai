const state =
{
    barDetails: '',
    modal: false,
    isBarInUserList: false,
    isBarOwnedByUser: false,


}

const getters =
{
    currentBarDetails: state =>
    {
        return state.barDetails;
    },

    currentModal: state =>
    {
        return state.modal;
    },

    currentIsBarInUserList: state =>
    {
        return state.isBarInUserList;
    },

    currentIsBarOwned: state =>
    {
        return state.isBarOwnedByUser;
    }

}
const mutations =
{
    updateBarDetails: (state,barDetails) =>
    {
        state.barDetails = barDetails;
    },

    updateModal: (state,modal) =>
    {
        state.modal = modal;
    },

    updateIfBarInUserList: (state,bool) =>
    {
        state.isBarInUserList = bool;
    },

    updateIsBarOwned: (state,bool) =>
    {
        state.isBarOwnedByUser = bool;
    }
}

const actions =
{
    updateBarDetailsAction: ({commit}, barDetails) =>
    {
        commit('updateBarDetails', barDetails);
    },

    updateModalAction: ({commit,dispatch},modal) =>
    {
        dispatch('isBarInUserListAction');
        dispatch('isBarOwnedByUserAction');
        commit('updateModal',modal);
    },

    isBarInUserListAction: ({commit,rootState,state}) =>
    {
        let userSubList = rootState.user_storage.subscriptions;
        if(userSubList.length > 0)
        {
            for(let i = 0; i < userSubList.length; i++)
            {
                if(userSubList[i].id === state.barDetails.node)
                {

                    commit('updateIfBarInUserList', true);
                    return;
                }
            }
            commit('updateIfBarInUserList', false);
        }

    },

    isBarOwnedByUserAction : ({commit,rootState,state}) =>
    {
        let ownedBars = rootState.user_storage.owned_bars;
        if(ownedBars.length > 0)
        {
            for(let i = 0; i < ownedBars.length; i++)
            {
                if(ownedBars[i].id === state.barDetails.node)
                {

                    commit('updateIsBarOwned', true);
                    return;
                }
            }
            commit('updateIsBarOwned', false);
        }
    },

    updateHeartStatus: ({commit},bool) =>
    {
        commit('updateIfBarInUserList', bool);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
