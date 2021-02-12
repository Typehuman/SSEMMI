<template>
    <div id='mapContainer'>
        
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
    name: 'Map',
    data() {
        return {
            mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
            mapView: null
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
                        const sightingEntry = {
                            entity: value.data_source_entity,
                            created: value.created,
                            witness: value.data_source_witness,
                            comments: value.data_source_comments,
                            coordinates: [value.longitude, value.latitude]
                        }

                        // console.log(sightingEntry)
                        
                        new mapboxgl.Marker()
                        .setLngLat(sightingEntry.coordinates)
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                '<div class="container">'
                                    +'<h4><b>'+sightingEntry.entity+'</b></h4>'
                                    +'<p><b>Created: </b>'+sightingEntry.created+'</p>'
                                    +'<p><b>Witness: </b>'+sightingEntry.witness+'</p>'
                                    +'<p><b>Comments: </b> '+sightingEntry.comments+'</p>'
                                +'</div>'
                                +'</div>'
                            )
                        )
                        .addTo(this.mapView)
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

            // // Insert coordinates into map as marker points
            // for (let i = 0; i < this.arrSightings.length; i++) {
            //     new mapboxgl.Marker()
            //     .setLngLat(this.arrSightings[i].coordinates)
            //     .setPopup(
            //         new mapboxgl.Popup({ offset: 25 }) // add popups
            //         .setHTML(
            //             '<div class="container">'
            //                 +'<h4><b>'+this.arrSightings[i].entity+'</b></h4>'
            //                 +'<p><b>Created: </b>'+this.arrSightings[i].created+'</p>'
            //                 +'<p><b>Witness: </b>'+this.arrSightings[i].witness+'</p>'
            //                 +'<p><b>Comments: </b> '+this.arrSightings[i].comments+'</p>'
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
    height: 500px;
    margin: 0 auto;
    position: relative;
}
</style>