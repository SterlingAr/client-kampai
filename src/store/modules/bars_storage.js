import axios from 'axios';

const state =
    {
        bars: [
            {
                tags: {
                    name: "Quark's bar"
                }
            }
        ],

        bars_resource_uri: ''

    }

const getters =
    {
        currentBars: state =>
        {
            return state.bars;
        },

        keywords: (state,getters,rootState) =>
        {
            return rootState.keywords;
        }

    }

const mutations =
    {

        updateBars: (state,payload) =>
        {
            state.bars = payload;
        }

    }

const actions =
    {
        /**
         * Given state values : app_storage.keywords, map_storage.bbox;
         * commit an array of nodes to state.bars and dispatch an action to update
         * the features shown on the map.
         *
         * @param state
         * @param commit
         * @param rootState
         * @param dispatch
         */
        updateBarsAction: ({state,commit,rootState,dispatch}) =>
        {

            dispatch('updateBBOXAction');
            let api_base_uri = rootState.api_base_uri;
            let keywords = rootState.app_storage.keywords;
            let bbox = rootState.map_storage.bbox;

            try
            {
                // if (api_base_uri === '') throw "EXCEPTION <api_base_uri> cannot be empty!";
                if (keywords === '') throw "EXCEPTION <keywords> cannot be empty";
                if (bbox === '') throw "EXCEPTION <bbox> cannot be empty";
            }
            catch (error)
            {
                console.log(error)
            }
            finally
            {

                state.bars_resource_uri = api_base_uri+'/api/bars/' + keywords + "/" + bbox;

                axios.get(state.bars_resource_uri)
                    .then((response) =>
                    {
                        console.log(response);

                        // console.log(bars);
                        commit('updateBars', response.data.bars.elements);

                        // dispatch('addFeaturesAction',bars);
                        // commit('updateFeatureCollection',response.data.features);
                        dispatch('addFeaturesToLayer',response.data.features);


                    }).catch((error) =>

                {
                    console.log(error);
                });

            }
            // this.$root.router.push({name:'bar_list'});

        }

    }


export default {

    state,
    getters,
    mutations,
    actions

}