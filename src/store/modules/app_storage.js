const state =
    {
        keywords: 'pizza',

    }

const getters =
    {
        currentKeywords: state =>
        {
            return state.keywords;
        },

    }

const mutations =
    {

        updateKeywords: (state,payload) =>
        {
            state.keywords = payload;
        },

    }

const actions =
    {

        updateKeywordsAction: ({commit}, payload) =>
        {
            commit('updateKeywords',payload);
        },

        sideBarAction: ({rootState},action) =>
        {

            switch(action)
            {
                case 'open':
                    rootState.map_storage.sidebar.open();
                    break;

                case 'close':
                    rootState.map_storage.sidebar.close();
                    break;

            }

        }

    }


export default {
    state,
    getters,
    mutations,
    actions
}