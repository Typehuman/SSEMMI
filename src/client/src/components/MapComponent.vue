<template>
    <div>
        <div id='mapContainer'></div>
        <div id='console'>
            <h2>Sightings</h2>
            <div class='row colors'></div>
            <div class='row labels'>
                <div class='label'>0</div>
                <div class='label'>1</div>
                <div class='label'>2</div>
                <div class='label'>3</div>
                <div class='label'>4</div>
                <div class='label'>5+</div>
            </div>
            <div class='session' id='sliderbar'>
                <h4>Sightings: <label id='active-hour'>January</label></h4>
                <input id='slider' class='row' type="range" min="1" max="12" step="1" value="0" />
            </div>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import moment from 'moment';

export default {
    name: 'Map',
    data() {
        return {
            mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
            mapView: null,
            geoJSONSightings: []
        }
    },
    computed: {
        grabSightings() {
            return this.$store.getters.getSightings
        }
    },
    watch:{
        grabSightings(currSights) {
            if (this.mapView && currSights) {
                // Insert coordinates into map as marker points
                Object.entries(currSights).forEach( ([key, value]) => {
                    // Create new array instance of two numbers for mapbox marker coordinate
                    console.log(key)
                    if(value) {   
                        // Check if sighting is a valid number
                        let filtered_sightings = (isNaN(value.no_sighted)) ? 1 : value.no_sighted
                        let filtered_date = moment(value.created)
                        let f_month = filtered_date.get('month') + 1
                        let f_year = filtered_date.get('year')

                        const sightingEntry = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [value.longitude, value.latitude]
                            },
                            "properties": {
                                "entity": value.data_source_entity,
                                "ssemmi_id": value.ssemmi_id,
                                "created": value.created,
                                "month": f_month,
                                "year": f_year,
                                "month_year": `${f_month}${f_year}`,
                                "no_sighted": filtered_sightings,
                                "witness": value.data_source_witness,
                                "comments": value.data_source_comments,
                                "ssemmi_date_added": value.ssemmi_date_added
                            }
                        }

                        this.geoJSONSightings.push(sightingEntry)
                        
                        // new mapboxgl.Marker()
                        // .setLngLat(sightingEntry.geometry.coordinates)
                        // .setPopup(
                        //     new mapboxgl.Popup({ offset: 25 }) // add popups
                        //     .setHTML(
                        //         '<div class="container">'
                        //             +'<h4><b>'+sightingEntry.properties.entity+'</b></h4>'
                        //             +'<p><b>SSEMMI ID: </b>'+sightingEntry.properties.ssemmi_id+'</p>'
                        //             +'<p><b>Created: </b>'+sightingEntry.properties.created+'</p>'
                        //             +'<p><b>No Sighted: </b>'+sightingEntry.properties.no_sighted+'</p>'
                        //             +'<p><b>Witness: </b>'+sightingEntry.properties.witness+'</p>'
                        //             +'<p><b>Comments: </b> '+sightingEntry.properties.comments+'</p>'
                        //             +'<p><b>Date Added: </b> '+sightingEntry.properties.ssemmi_date_added+'</p>'
                        //         +'</div>'
                        //         +'</div>'
                        //     )
                        // )
                        // .addTo(this.mapView)
                    }
                })
            }
        }
    },
    mounted() {
        this.mapSightings()
        this.loadSightings()
    },
    methods: {
      mapSightings() {
            // Grab access token for Mapbox
            mapboxgl.accessToken = this.mapboxKey

            // Initialise mapbox container
            const map = new mapboxgl.Map({
                container: 'mapContainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-122.312490, 47.951812],
                zoom: 7.0
            });

            // Add navigation buttons on top right of the map
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, "top-right")

            this.mapView = map
            this.mapView.resize();

            let geoData = {
                "type": "FeatureCollection",
                "features": this.geoJSONSightings
            }

            const months = [
                '',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]

            map.on('load', function() {
                map.addLayer({
                    id: 'ssemmi-map-layer',
                    type: 'circle',
                    source: {
                    type: 'geojson',
                    data: geoData
                    },
                    paint: {
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['number', ['get', 'no_sighted']],
                        0, '#2DC4B2',
                        1, '#3BB3C3',
                        2, '#669EC4',
                        3, '#8B88B6',
                        4, '#A2719B',
                        5, '#AA5E79'
                    ],
                    'circle-opacity': 1
                    },
                    filter: ['==', ['number', ['get', 'month']], 1]
                })

                document.getElementById('slider').addEventListener('input', function(e) {
                    let month = parseInt(e.target.value);
                    // update the map
                    map.setFilter('ssemmi-map-layer', ['==', ['number', ['get', 'month']], month]);

                    // update text in the UI
                    document.getElementById('active-hour').innerText = months[month];
                });
            })

            map.on('click', 'ssemmi-map-layer', function (e) {
                let coordinates = e.features[0].geometry.coordinates.slice();
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                            '<div class="container">'
                                +'<h4><b>'+e.features[0].properties.entity+'</b></h4>'
                                +'<p><b>SSEMMI ID: </b>'+e.features[0].properties.ssemmi_id+'</p>'
                                +'<p><b>Created: </b>'+e.features[0].properties.created+'</p>'
                                +'<p><b>Date: </b>'+e.features[0].properties.month+' '+ e.features[0].properties.year+'</p>'
                                +'<p><b>No Sighted: </b>'+e.features[0].properties.no_sighted+'</p>'
                                +'<p><b>Witness: </b>'+e.features[0].properties.witness+'</p>'
                                +'<p><b>Comments: </b> '+e.features[0].properties.comments+'</p>'
                                +'<p><b>Date Added: </b> '+e.features[0].properties.ssemmi_date_added+'</p>'
                            +'</div>'
                            +'</div>'
                        )
                .addTo(map);
            })

            // // Insert coordinates into map as marker points
            // for (let i = 0; i < this.arrSightings.length; i++) {
            //     new mapboxgl.Marker()
            //     .setLngLat(this.arrSightings[i].coordinates)
            //     .setPopup(
            //         new mapboxgl.Popup({ offset: 25 }) // add popups
            //         .setHTML(
            //             '<div class="container">'
            //                 +'<h4><b>'+this.arrSightings[i].entity+'</b></h4>'
            //                 +'<p><b>SSEMMI ID: </b>'+sightingEntry.properties.ssemmi_id+'</p>'
            //                 +'<p><b>Created: </b>'+this.arrSightings[i].created+'</p>'
            //                 +'<p><b>No Sighted: </b>'+this.arrSightings[i].no_sighted+'</p>'
            //                 +'<p><b>Witness: </b>'+this.arrSightings[i].witness+'</p>'
            //                 +'<p><b>Comments: </b> '+this.arrSightings[i].comments+'</p>'
            //                 +'<p><b>Date Added: </b> '+sightingEntry.properties.ssemmi_date_added+'</p>'
            //             +'</div>'
            //             +'</div>'
            //         )
            //     )
            //     .addTo(map)
            // }
      },
      loadSightings() {
            // Call the method to retreive data
            this.$store.dispatch("get_sightings")
        }
    } 
}
</script>

<style>
#mapContainer {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

#console {
    position: absolute;
    width: 20%;
    height: 20%;
    top: 10%;
    background-color: white;
    font-size-adjust: inherit;
}

.session {
  margin-left: 5%;
}

.row {
  height: 12px;
  width: 100%;
}

.colors {
  background: linear-gradient(to right, #2dc4b2, #3bb3c3, #669ec4, #8b88b6, #a2719b, #aa5e79);
  /* margin-bottom: 5px; */
}

.label {
  width: 15%;
  display: inline-block;
  text-align: center;
}
</style>