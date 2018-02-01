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
    locationControl: '',
    userLocation: {}
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
    }


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
            // iconUrl: 'https://i.imgur.com/HhV6EbI.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let pubIcon = L.icon({
            iconUrl: 'static/images/beer.png',
            // iconUrl: 'https://i.imgur.com/DujcmnC.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let cafeIcon = L.icon({
            iconUrl: 'static/images/coffee-cup.png',
            // iconUrl: 'https://i.imgur.com/Iu61SKg.png',
            iconSize: [25, 28],
            iconAnchor: [16, 37],
            // popupAnchor: [0, -28]
        });

        let fastIcon = L.icon({
            iconUrl: 'static/images/fries.png',
            // iconUrl: 'https://i.imgur.com/vMAUoby.png',
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

       //Routing control


        //SIDEBAR PLUGIN
        // let marker = L.marker([51.2, 7]).addTo(map);
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
                setView: 'once',
                icon: 'fa fa-street-view',
                drawCircle: false,
            }
        ).addTo(map);


        //
        //create object, commit to vuex storage and add to map

        let locationControl = L.Routing.control({
            // waypoints: [
            //     L.latLng(43.3242622, -1.9822356),
            //     L.latLng(43.3243284, -1.9849168)
            // ],
            router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q',{
                profile: 'mapbox/walking',
            })
        }).addTo(map);

        commit('updateLocationControl', locationControl);


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

        // let options = {};
        //
        // options.user = {};
        console.log('current bar');
        console.log(rootState.bar_storage.barDetails);
        let bar = rootState.bar_storage.barDetails.coord;
        // options.user.lat = 43.3242622;
        //
        // options.user.lon = -1.9822356;
        //
        // options.bar.lat = 43.3243284;
        //
        // options.bar.lon = -1.9849168;

    //L.Dom.on .. locationfound, send coordinates to function 'spliceWaypoints'
    //change starting point using locationfound coordinates
    //  control.spliceWaypoints(0, 1, e.latlng);


    // Using the feature's coordinates, change routing destination
    // control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);

     // L.Routing.control({
     //        // waypoints: [
     //        //     // L.latLng(options.user.lat, options.user.lon),
     //        //     // L.latLng(options.bar.lat, options.bar.lon)
     //        //     L.latLng(bar.lat, bar.lon),
     //        //     L.latLng(43.3243284,  -1.9849168)
     //        // ],
     //        router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q',{
     //            profile: 'mapbox/walking',
     //
     //        }),
     //
     //    }).addTo(map);



        // control.spliceWaypoints(0, 1, e.latlng);
        // update user location and locationControlObject.
        // let lc = L.control.locate().addTo(map);

        state.locationControl.start();
        commit('updateLocationControl',lc);

        console.log(state.userLocation);
        console.log('location found through action');

        // routing.add

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