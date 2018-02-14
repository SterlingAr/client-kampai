const state =
{
    claimModal: false,
    barKeywords: []
}

const getters =
{
    currentClaimModal: state =>
    {
        return state.claimModal;
    },

    currentBarKeywords: state =>
    {
        return state.barKeywords;
    }
}

const mutations =
{

    updateClaimModal: (state,modalStatus) =>
    {
        state.claimModal = modalStatus;
    },

    updateBarKeywords: (state,barKeywords) =>
    {
        state.barKeywords = barKeywords;
    }

}

const actions =
{
    claimModalAction: ({commit}, modalStatus) =>
    {
        commit('updateClaimModal', modalStatus);
    },

    barKeywordsUpdateAction:({commit},barKeywords)=>
    {

    },

    barKeywordsSplitAction:({commit},barKeywords) =>
    {

        commit('updateBarKeywords',barKeywords.split(';'));
    },

    updateCurrentAndMerge: ({commit,state},barKeywords) =>
    {
        commit('updateBarKeywords',barKeywords);

        let mergedKeys = '';
        for (let k of barKeywords)
        {
            mergedKeys += k+";";
        }
        console.log(mergedKeys);
    },


    updateKeywordsOnServer: ({state},mergedKeywords) =>
    {

    }


 }


export default
{
    state,
    getters,
    mutations,
    actions
}