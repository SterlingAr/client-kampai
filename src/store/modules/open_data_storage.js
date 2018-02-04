/**
 * Tests con datos GeoJSON del gobierno vasco
 * http://opendata.euskadi.eus/catalogo/-/restaurantes-asadores-sidrerias-bodegas-y-bares-de-pintxos-de-euskadi/
 * http://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/restaurantes_sidrerias_bodegas/opendata/restaurantes.geojson
 * @type {{}}
 */

import axios from 'axios';

const state =
{
        openDataLayer: '',
        geojsonDataURI: 'static/open_data/data.geojson'
}
const getters =
{

}
const mutations =
{
    updateODLayer: (state,layer) =>
    {
        state.openDataLayer = layer;
    }

}

const actions =
{

    openDataLayerAction: ({commit,state,rootState,dispatch}) =>
    {



        let od_layer = L.geoJSON(false,{
            style: function (feature) {
                return feature.properties && feature.properties.style;
            },

            onEachFeature: onEachFeature,

            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(rootState.map_storage.map);

        commit('updateODLayer', od_layer);



        axios.get(state.geojsonDataURI).then((response) =>
        {
            console.log(response);
            od_layer.addData(response.data.features);

        }).catch((error)=>{
            console.log(error);
        });

    }

}

function onEachFeature(feature, layer) {

    let popupContent = "<ul>";

    if (feature.properties) {
        for(let index in feature.properties)
        {

            if(index === 'documentname' ||
               index === 'turismdescription'||
               index === 'locality' ||
               index === 'phone' ||
               index === 'adress' ||
               index === 'marks' ||
               index === 'tourismemail' ||
               index === 'web' ||
               index === 'restorationtype'
            )
            {
                if(feature.properties.hasOwnProperty(index))
                {
                    popupContent += "<li>" + feature.properties[index] + "</li>";
                }
            }



        }
    }
    popupContent +=  "</ul>";
    layer.bindPopup(popupContent);
}


export default
{
    state,
    getters,
    mutations,
    actions

}