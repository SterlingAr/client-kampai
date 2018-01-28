const state =
{
    barDetails: '',

}
const getters =
{


    currentBarDetails: state =>
    {
        return state.barDetails;
    }

}
const mutations =
{

    updateBarDetails: (state,barDetails) =>
    {
        state.barDetails = barDetails;
    }


}
const actions =
{
    updateBarDetailsAction: ({commit}, barDetails) =>
    {
            commit('updateBarDetails', barDetails);
    }
}



export default {
    state,
    getters,
    mutations,
    actions
}
