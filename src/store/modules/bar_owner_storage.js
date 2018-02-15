import axios from 'axios'

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


    barKeywordsSplitAction:({commit},barKeywords) =>
    {
        commit('updateBarKeywords',barKeywords.split(';'));
    },

    updateCurrentAndMerge: ({commit,state,dispatch},barKeywords) =>
    {
        commit('updateBarKeywords',barKeywords);

        let mergedKeys = '';
        for (let k of barKeywords)
        {
            mergedKeys += k + ";";
        }
        dispatch('updateKeywordsOnServer',mergedKeys);
    },


    updateKeywordsOnServer: ({state,rootState},mergedKeywords) =>
    {

        axios.post(rootState.api_base_uri+ "/api/auth/keywords",
        {
            node: rootState.bar_storage.barDetails.node,
            keywords: mergedKeywords
        },

        {
            headers:
            {
                Authorization: ' Bearer ' + rootState.auth_storage.token,
            },
        }).then((response) =>
        {
            console.log(response);
        }).catch((error) =>
        {
            console.log(error);
        });

    }


 }


export default
{
    state,
    getters,
    mutations,
    actions
}