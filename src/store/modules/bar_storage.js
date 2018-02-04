const state =
{
    barDetails: '',
    modal: false,

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
    }
}
const actions =
{
    updateBarDetailsAction: ({commit}, barDetails) =>
    {
        commit('updateBarDetails', barDetails);
    },

    updateModalAction: ({commit},modal) =>
    {
        commit('updateModal',modal);
    }
}



export default {
    state,
    getters,
    mutations,
    actions
}
