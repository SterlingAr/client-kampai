const state =
{
    claimModal: false,
}

const getters =
{
    currentClaimModal: state =>
    {
        return state.claimModal;
    }
}

const mutations =
{

    updateClaimModal: (state,modalStatus) =>
    {
        state.claimModal = modalStatus;
    }

}

const actions =
{
    claimModalAction: ({commit}, modalStatus) =>
    {
        commit('updateClaimModal', modalStatus);
    }
}


export default
{
    state,
    getters,
    mutations,
    actions
}