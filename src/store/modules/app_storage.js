const state =
    {
        keywords: 'pizza',
        menu: false,

    }

const getters =
    {
        currentKeywords: state =>
        {
            return state.keywords;
        },

        currentMenu: state =>
        {
            return state.menu;
        }

    }

const mutations =
    {

        updateKeywords: (state,payload) =>
        {
            state.keywords = payload;
        },

        updateMenu: (state,menuStatus) =>
        {
            state.menu = menuStatus;
        }

    }

const actions =
    {

        updateKeywordsAction: ({commit}, payload) =>
        {
            commit('updateKeywords',payload);
        },

        menuAction: ({commit}, menuStatus) =>
        {
            commit('updateMenu', menuStatus);
        }

    }


export default {
    state,
    getters,
    mutations,
    actions
}