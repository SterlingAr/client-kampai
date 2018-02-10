const state =
{
    barDetails: '',
    modal: false,
    isBarInUserList: false,


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
