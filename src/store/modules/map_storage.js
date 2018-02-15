const state =
{
    MAP_API_PROVIDER: 'https://api.mapbox.com/styles/v1/rincewind/cjdhzh9lf0fu82sl4ai418ugs/tiles/256/{z}/{x}/{y}?access_token=',
    API_TOKEN: 'pk.eyJ1IjoicmluY2V3aW5kIiwiYSI6ImNqZGh5b3RqbjA0eHMyd3E5cTNiM2lnbzAifQ.oTnYCe-yN4nTSwWMshpzew',
    MAP_STYLE: 'streets',
    bbox: '',
    map: '',
    featureCollection: '',
    featureLayer: '',
    locationControl: '',
    routingControl: '',
    routingProfile: '',
    userLocation: '',
    toolbar: '',
    sidebar: ''

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

    currentToolBar: state =>
    {
        return state.currentToolBar;
    },
    currentSideBar: state =>
    {
        return state.sidebar;
    }


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
    updateToolBar: (state,toolbar) =>
    {
        state.toolbar = toolbar;
    },

    updateSideBar: (state,sidebar) =>
    {
        state.sidebar = sidebar;
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
    initMapAction: ({commit,rootState,state,dispatch,}) =>
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


        map.on('locationfound', (e) => {
            state.userLocation = e.latlng;
            // commit('updateUserLocation', e.latlng);
        });

        let credctrl = L.controlCredits({
            image: "static/images/logo.png",
            link: "https://www.flaticon.com/",
            text: " <div>Icons made by <a href=\"http://www.freepik.com\" title=\"Freepik\">Freepik</a> from <a href=\"https://www.flaticon.com/\" title=\"Flaticon\">www.flaticon.com</a> is licensed by <a href=\"http://creativecommons.org/licenses/by/3.0/\" title=\"Creative Commons BY 3.0\" target=\"_blank\">CC 3.0 BY</a></div>"
        }).addTo(map);

        L.control.zoom({
            position:'bottomright'
        }).addTo(map);


        L.tileLayer(state.MAP_API_PROVIDER + '{accessToken}',mapOptions)
            .addTo(map);

        let dinnerIcon = L.icon({
            iconUrl: 'static/images/dinner.png',
            iconSize: [40, 45],
            iconAnchor: [20, 35],
        });

        let pubIcon = L.icon({
            iconUrl: 'static/images/beer.png',
            iconSize: [40, 45],
            iconAnchor: [20, 35],
        });

        let cafeIcon = L.icon({
            iconUrl: 'static/images/coffee.png',
            iconSize: [40, 45],
            iconAnchor: [20, 35],
        });

        let fastIcon = L.icon({
            iconUrl: 'static/images/burger.png',
            iconSize: [40, 45],
            iconAnchor: [20, 35],
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


        //SIDEBAR PLUGIN
        // let marker = L.marker([51.2, 7]).addTo(map);
        let sidebar = L.control.sidebar('sidebar').addTo(map);
        commit('updateSideBar',sidebar);



        // SEARCH BOX
        L.control.custom({
            position: 'topleft',
            content : '<form class="form-wrapper cf">'+
            '    <input type="text"   placeholder="e.g: pizza kebab" onchange="App.$refs.main.updateKeywords(event)"  onkeypress="App.$refs.main.updateBarsOnEnter(event)">'+
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


       let locationControl =  L.control.locate(
            {
                position: 'bottomright',
                setView: 'false',
                icon: 'fa fa-street-view',
                drawCircle: false,
            }
        );





        commit('updateLocationControl', locationControl);
        locationControl.addTo(map);



        //update userLocation object in storage every time the event is triggered.
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
            // change with {} in the future
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
            feature.details.node = bar.id;
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

    locateUserPromise: ({commit,state}) =>
    {
        return new Promise(function(resolve,reject)
        {
            state.map.locate({setView: false, maxZoom: 16})
                .on('locationfound',function(e){
                    commit('updateUserLocation',e.latlng);
                    // resolve(e.latlng);
                    resolve();
                });
        });
    },

    plotAtoB: ({commit,state,rootState,dispatch},uProfile) =>
    {
        let barLocation = rootState.bar_storage.barDetails.coord;
        let routingControl;
        let profile = state.routingProfile;

        /**
         * If routing control doesn't exist, create it, commit it.
         */
        //create routingControl for the first time
        if(state.routingControl  === '' )
        {
            routingControl =  L.Routing.control({
                router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q', {
                    profile: uProfile,
                    language:'es'
                })
            });
            //splice syntax, replace 1 element at position 0
            routingControl.spliceWaypoints(0,1, state.userLocation);
            routingControl.spliceWaypoints(1,1,barLocation);
            routingControl.addTo(state.map);
            commit('updateRoutingProfile',uProfile);
            commit('updateRoutingControl', routingControl);
            dispatch('updateModalAction',false);
            return;
        }

        if(profile !== uProfile)
        {
            state.routingControl.remove(state.map);
            routingControl = L.Routing.control({
                router: L.Routing.mapbox('pk.eyJ1IjoibWFyYm9yYXYiLCJhIjoiY2o5eDJrbTV0N2NncjJxcXljeDR3cXNhMiJ9.igTamTLm4nLiAN6w8NFS6Q', {
                    profile: uProfile,
                    language:'es'
                })
            });
            routingControl.addTo(state.map);
            commit('updateRoutingProfile',uProfile);

        }

        console.log(profile);
        //splice syntax, replace 1 element at position 0
        routingControl.spliceWaypoints(0,1, state.userLocation);
        routingControl.spliceWaypoints(1,1,barLocation);
        commit('updateRoutingControl', routingControl);

        dispatch('updateModalAction',false);
    },

    plotRouteAction: ({state,dispatch},uProfile) => //add another param options.
    {

            if(state.userLocation === '')
            {
                dispatch('locateUserPromise').then(() =>
                {
                    dispatch('plotAtoB',uProfile);
                });
            }

            else
            {
                dispatch('plotAtoB',uProfile);
            }

            dispatch('createToolBar');

    },

    createToolBar: ({commit,state,dispatch}) =>
    {
        let clearRouteAction =  L.Toolbar2.Action.extend({
            options:
                {
                    toolbarIcon: {
                        html: '<img class="tool-bar-icons" src="static/icons/map/clear-routes.svg"> </img>',
                        className: 'tool-bar'
                    }
                },
            addHooks: function()
            {
                // state.routingControl.remove(map);
                dispatch('removeRoutingControl');
            }
        });


        let carRouteAction = L.Toolbar2.Action.extend({
            options:
                {
                    toolbarIcon: {
                        html: '<img class="tool-bar-icons" src="static/icons/transport/car.svg"> </img>',
                        className: 'tool-bar'
                    }
                },
            addHooks: function()
            {
                // state.routingControl.remove(map);
                dispatch('plotRouteAction','mapbox/driving');
            }
        });

        let bikeRouteAction = L.Toolbar2.Action.extend({
            options:
                {
                    toolbarIcon: {
                        html: '<img class="tool-bar-icons " src="static/icons/transport/cycle.svg"> </img>',
                        className: 'tool-bar'
                    }
                },
            addHooks: function()
            {
                // state.routingControl.remove(map);
                dispatch('plotRouteAction','mapbox/cycling');
            }
        });

        let walkingRouteAction = L.Toolbar2.Action.extend({
            options:
                {
                    toolbarIcon: {
                        html: '<img class="tool-bar-icons " src="static/icons/transport/walk.svg"> </img>',
                        className: 'tool-bar'
                    }
                },
            addHooks: function()
            {
                // state.routingControl.remove(map);
                dispatch('plotRouteAction','mapbox/walking');
            }
        });

        let trafficRouteAction = L.Toolbar2.Action.extend({
            options:
                {
                    toolbarIcon: {
                        html: '<img class="tool-bar-icons " src="static/icons/transport/traffic.svg"> </img>',
                        className: 'tool-bar'
                    }
                },
            addHooks: function()
            {
                // state.routingControl.remove(map);
                dispatch('plotRouteAction','mapbox/driving-traffic');
            }
        });

        let toolbar = new L.Toolbar2.Control({
            position: 'bottomleft',
            actions: [
                trafficRouteAction,
                carRouteAction,
                walkingRouteAction,
                bikeRouteAction,
                clearRouteAction,
            ]
        });

        commit('updateToolBar', toolbar);
        toolbar.addTo(state.map);
    },

    removeRoutingControl: ({state}) =>
    {
        state.routingControl.remove(map);
        state.toolbar.remove(map);
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