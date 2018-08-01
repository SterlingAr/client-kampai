import Vue from "vue";
import Vuex from 'vuex';

import axios from 'axios';

import map_storage from './modules/map_storage';
import app_storage from './modules/app_storage';
import bars_storage from './modules/bars_storage';
import user_storage from './modules/user_storage';
import auth_storage from './modules/auth_storage';
import bar_storage from './modules/bar_storage';
import bar_owner_storage from './modules/bar_owner_storage';
import open_data_storage from './modules/open_data_storage';


Vue.use(Vuex);

const store = new Vuex.Store(
{
    state:
    {
        appTitle: {
            title: 'Kampai',
        },


        api_base_uri: 'https://api-kampai.marius-cv.com/',

    },

    getters:
    {
        currentTitle: state =>
        {
            return state.appTitle;
        },

        currentBaseURI: state =>
        {
            return state.api_base_uri;
        }

    },

    mutations:
    {
        changeTitle: (state, newTitleObject) =>
        {

            state.appTitle.title = newTitleObject.title;

        },

        changeBaseURI: (state,newUriObject) =>
        {
            return state.api_base_uri = newUriObject.api_base_uri;
        }
    },

    actions:
    {
        changeTitle: ({commit}, newTitleObject) =>
        {

            commit('changeTitle', newTitleObject);

        },

        changeBaseUriAction: ({commit}, newUriObject) =>
        {

        }

    },

    modules:
    {
        map_storage,
        app_storage,
        bars_storage,
        user_storage,
        auth_storage,
        bar_storage,
        open_data_storage,
        bar_owner_storage
    }

});

export default store;

