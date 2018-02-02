const state =
{
    MAP_API_PROVIDER: 'https://api.mapbox.com/styles/v1/marborav/cjb7ndf2q3olg2qk50cpyzvy0/tiles/256/{z}/{x}/{y}?access_token=',
    API_TOKEN: 'pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q',
    MAP_STYLE: 'streets',
    bbox: '',
    map: '',
    featureCollection: '',
    featureLayer: '',
    locationControl: '',
    routingControl: '',
    routingProfile: '',
    userLocation: {},

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

    currentUserLocation: state =>
    {
        return state.userLocation;
    },

    currentLocationControl: state =>
    {
        return state.locationControl;
    },

    currentRoutingControl: state =>
    {
        return state.routingControl;
    },


}


const mutations =
{

    updateBBOX: (state,bbox) =>
    {
        state.bbox = bbox;
    },


    updateMap: (state,map) =>
    {
        state.map = map;
    },

    updateFeatureCollection: (state,featureCollection) =>
    {
        state.featureCollection = featureCollection;
    },

    updateFeatureLayer: (state, featureLayer) =>
    {
        state.featureLayer = featureLayer;
    },

    updateUserLocation: (state,userLocation) =>
    {
        state.userLocation = userLocation;
    },

    updateLocationControl: (state,locationControl) =>
    {
        state.locationControl = locationControl;
    },

    updateRoutingControl: (state,routingControl) =>
    {
        state.routingControl = routingControl;
    },
    updateRoutingProfile: (state,routingProfile) =>
    {
        state.routingProfile = routingProfile;
    },



}


const actions =
{


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
            iconUrl: 'static/images/dinner.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
        });

        let pubIcon = L.icon({
            iconUrl: 'static/images/beer.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
        });

        let cafeIcon = L.icon({
            iconUrl: 'static/images/coffee-cup.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
        });

        let fastIcon = L.icon({
            iconUrl: 'static/images/fries.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
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


        }).addTo(map);

       //Routing control
       //  let routingControl = L.Routing.control({
       //      router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q',{
       //          profile: 'mapbox/walking',
       //      })
       //  });
       //  commit('updateRoutingControl', routingControl);
       //  routingControl.addTo(map);


        //SIDEBAR PLUGIN
        // let marker = L.marker([51.2, 7]).addTo(map);
        let sidebar = L.control.sidebar('sidebar').addTo(map);

        // SEARCH BOX
        L.control.custom({
            position: 'topleft',
            content : '<form class="form-wrapper cf">'+
            '    <input type="text" name="search" placeholder="Busca lo que desees" onchange="App.$refs.main.updateKeywords(event)">'+
                '<button onclick="App.$refs.main.updateBarsAndRoute()" id="updateBarsButton" type="button">Buscar</button>'+
            '</form>',
            classes : '',
            style   :
                {
                    position: 'relative',
                    left: '1px',
                    top: '-160px',
                }
        })
            .addTo(map);




        //
        //create object, commit to vuex storage and add to map




       let locationControl =  L.control.locate(
            {
                position: 'bottomright',
                setView: 'once',
                icon: 'fa fa-street-view',
                drawCircle: false,
            }
        );
        commit('updateLocationControl', locationControl);
        locationControl.addTo(map);

        //update userLocation object in storage every time the event is triggered.
        map.on('locationfound', function(e){
            commit('updateUserLocation', e.latlng);
        });


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
            feature.details.coord = {};
            feature.details.coord.lat  = bar.lat;
            feature.details.coord.lon  = bar.lon;


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

    plotRouteAction: ({commit,rootState,state},options) => //add another param options.
    {
        let map = state.map;
        let bar = rootState.bar_storage.barDetails.coord;

        //Add new LocateControl, should be refactored to only update coordinates.
        let lc = new L.Control.Locate().addTo(map);
        lc.start();
        // remove it otherwise we have two controlers.
        lc.remove(map);

        //create routing instance with the first profile
        //if profile is the same, update current routing instance
        //else, create new route with the new profile.
        let routingControl;

        let profile = state.routingProfile;

        if( state.routingControl  === '')
        {
          routingControl =  L.Routing.control({
                router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q', {
                    profile: options.profile,
                })
            });

            commit('updateRoutingProfile',options.profile);
        }

        if ( profile !== options.profile )
        {
            routingControl = L.Routing.control({
                router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q', {
                    profile: options.profile,
                })
            });
            commit('updateRoutingProfile',options.profile);

        }



        if(profile)
        {
            routingControl = state.routingControl;
        }

        routingControl.addTo(map);


        //splice syntax, replace 1 element at position 0
        routingControl.spliceWaypoints(0,1, state.userLocation);
        routingControl.spliceWaypoints(1,1,bar);

        commit('updateRoutingControl', routingControl);
        commit('updateMap', map);
    }

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
    layer.on({
        click: whenClicked
    });
}