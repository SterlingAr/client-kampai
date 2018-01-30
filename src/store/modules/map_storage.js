const state =
{
    MAP_API_PROVIDER: 'https://api.mapbox.com/styles/v1/marborav/cjb7ndf2q3olg2qk50cpyzvy0/tiles/256/{z}/{x}/{y}?access_token=',
    API_TOKEN: 'pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q',
    MAP_STYLE: 'streets',
    bbox: '',
    map: '',
    featureCollection: '',
    featureLayer: '',
    barIcon: 'https://imgur.com/a/ppfBY',
}


const getters =
{


    currentBBOX: state =>
    {
        return state.bbox;
    },


    currentMap: state =>
    {
        return state.map;
    },

    currentFeatures: state =>
    {
        return state.featureCollection;
    },

    currentFeatureLayer: state =>
    {
        return state.featureLayer;
    },


}


const mutations =
{

    updateBBOX: (state, payload) =>
    {
        state.bbox = payload;
    },


    updateMap: (state,payload) =>
    {
        state.map = payload;
    },

    updateFeatureCollection: (state,payload) =>
    {
        state.featureCollection = payload;
    },

    updateFeatureLayer: (state, payload) =>
    {
        state.featureLayer = payload;
    },


}


const actions =
{

    showModal: (e) =>
    {
        console.log(e);


    },



    updateBBOXAction: ({commit}) =>
    {
        let s, w, n, e, mapBounds;
        mapBounds = state.map.getBounds();

        s = mapBounds['_southWest']['lat'];
        w = mapBounds['_southWest']['lng'];
        n = mapBounds['_northEast']['lat'];
        e = mapBounds['_northEast']['lng'];

        let bbox = s + ',' + w + ',' + n + ',' + e;
        commit('updateBBOX', bbox);
    },

    updateMapAction: ({commit}, payload) =>
    {
        commit('updateMap', payload);
    },

    /**
     * starts the map, all initial values should be handled with this function
     * @param commit
     * @param dispatch
     */
    initMapAction: ({commit,dispatch}) =>
    {

        let mapOptions =
        {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 20,
            id: state.MAP_STYLE,
            accessToken: state.API_TOKEN,
        };


        let map = L.map("map", {
            zoomControl:false,
            center: [43.3213337, -1.976819],
        }).setView([ 43.3213337,-1.976819], 16);

        L.control.zoom({
            position:'bottomright'
        }).addTo(map);



        L.tileLayer(state.MAP_API_PROVIDER + '{accessToken}',mapOptions)
            .addTo(map);

        let dinnerIcon = L.icon({
            iconUrl: 'https://i.imgur.com/HhV6EbI.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let pubIcon = L.icon({
            iconUrl: 'https://i.imgur.com/DujcmnC.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let cafeIcon = L.icon({
            iconUrl: 'https://i.imgur.com/Iu61SKg.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let fastIcon = L.icon({
            iconUrl: 'https://i.imgur.com/vMAUoby.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });


       let featureLayer =  L.geoJSON(false, {

            pointToLayer: function (feature, latlng) {
                if(feature.amenity === 'bar')
                {
                    return L.marker(latlng, {icon: pubIcon});
                }
                if(feature.amenity === 'restaurant')
                {
                    return L.marker(latlng, {icon: dinnerIcon});

                }

                if(feature.amenity === 'cafe')
                {
                    return L.marker(latlng, {icon: cafeIcon});

                }

                if(feature.amenity === 'fast_food')
                {
                    return L.marker(latlng, {icon: fastIcon});

                }


            },

           // onEachFeature: onEachFeature

           style: function (feature) {
               return feature.properties && feature.properties.style;
           },

           onEachFeature: onEachFeature,

           // pointToLayer: function (feature, latlng) {
           //     return L.circleMarker(latlng, {
           //         radius: 8,
           //         fillColor: "#ff7800",
           //         color: "#000",
           //         weight: 1,
           //         opacity: 1,
           //         fillOpacity: 0.8
           //     });
           // }
        }).addTo(map);


        let marker = L.marker([51.2, 7]).addTo(map);

        //SIDEBAR PLUGIN
        let sidebar = L.control.sidebar('sidebar').addTo(map);

        // SEARCH BOX
        L.control.custom({
            position: 'topleft',
            content : '<form class="form-wrapper cf">'+
            '    <input type="text" name="search" placeholder="Search" onchange="App.$refs.main.updateKeywords(event)">'+
                '<button onclick="App.$refs.main.updateBarsAndRoute()" id="updateBarsButton" type="button">Search</button>'+
            '</form>',
            classes : '',
            style   :
                {
                    position: 'relative',
                    left: '1px',
                    top: '-163px',
                    width: '200px',
                }
        })
            .addTo(map);


        L.control.locate(
            {
                position: 'bottomright',
                setView: 'once'
            }
        ).addTo(map);


        commit('updateFeatureLayer', featureLayer);

        commit('updateMap', map);

    },

    /**
     * receives an array of node objects, commits a FeatureCollection  holding all nodes
     * @param commit
     * @param dispatch
     * @param bars
     */
    addFeaturesAction: ({commit,dispatch}, bars) =>
    {

        let featuresArray = [];
        let featureCollection = new Object();

        for(let bar of bars)
        {
            // if(bar.tags === null || bar.tags === '')
            //     continue;

            let feature = new Object();
            let featureProperties = new Object();
            let featureGeometry = new Object();
            // featureProperties.popupContent =  "Establecimiento";
            featureGeometry.type = "Point";

            featureGeometry.coordinates = [bar.lon,bar.lat];

            feature.type = "Feature";
            feature.properties = featureProperties;
            feature.geometry = featureGeometry;
            feature.amenity = bar.tags.amenity;
            feature.details = bar.tags;
            featuresArray.push(feature);

        }

        featureCollection.type = "FeatureCollection";
        featureCollection.features = featuresArray;
        commit('updateFeatureCollection',featureCollection);

        dispatch('addFeaturesToLayer',featureCollection);

    },

    addFeaturesToLayer: ({commit}, featureCollection) =>
    {


            let layer = state.featureLayer;

            layer.clearLayers();

            layer.addData(featureCollection);

            commit('updateFeatureLayer', layer);

    },

}

export default {
    state,
    getters,
    mutations,
    actions
}

/**
 * Functions out of the vuex scope.
 */

function whenClicked(e)
{
    //Dirty, dirty.. hack
    App.$refs.main.setBarDetails(e.sourceTarget.feature.details);
}

/**
 *
 * @param feature
 * @param layer
 */
function onEachFeature(feature, layer)
{
    // let popupContent = "<p>I started out as a GeoJSON " +
    //     feature.geometry.type + ", but now I'm a Leaflet vector!</p>";
    //
    // if (feature.properties && feature.properties.popupContent) {
    //     popupContent += feature.properties.popupContent;
    // }

    layer.on({
        click: whenClicked
    });

    // layer.bindPopup(popupContent);
}