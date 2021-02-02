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
            arrSightings: []
        }
    },
    mounted() {
        this.loadSightings()
    },
    methods: {
      mapSightings() {
            // Grab access token for Mapbox
            mapboxgl.accessToken = this.mapboxKey

            // Initialise mapbox container
            const map = new mapboxgl.Map({
                container: 'mapContainer',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-122.312490, 47.951812],
                zoom: 7.0
            });

            // Add navigation buttons on top right of the map
            const nav = new mapboxgl.NavigationControl()
            map.addControl(nav, "top-right")

            // Insert coordinates into map as marker points
            for (let i = 0; i < this.arrSightings.length; i++) {
                new mapboxgl.Marker()
                .setLngLat(this.arrSightings[i].coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        '<div class="container">'
                            +'<h4><b>'+this.arrSightings[i].entity+'</b></h4>'
                            +'<p><b>Created: </b>'+this.arrSightings[i].created+'</p>'
                            +'<p><b>Witness: </b>'+this.arrSightings[i].witness+'</p>'
                            +'<p><b>Comments: </b> '+this.arrSightings[i].comments+'</p>'
                        +'</div>'
                        +'</div>'
                    )
                )
                .addTo(map)
            }
      },
      loadSightings() {
            // Call the method to retreive data
            this.$store.dispatch("get_ipfs_sightings")
            .then( () => {
                const res = this.$store.getters.getSightings
                console.log(`loaded sightss: ${res}`)

                // if (res) {
                    // Process data into location points
                    for(let i = 0; i < res.length; i++) {
                        // Create new array instance of two numbers for mapbox marker coordinate
                        const arrCoordinates = new Array()
                        if(res[i]) {
                            arrCoordinates.push(res[i].longitude)
                            arrCoordinates.push(res[i].latitude)

                            const sightingEntry = {
                                entity: res[i].data_source_entity,
                                created: res[i].created,
                                witness: res[i].data_source_witness,
                                comments: res[i].data_source_comments,
                                coordinates: arrCoordinates
                            }
                            this.arrSightings.push(sightingEntry)
                        }
                    }
                // }
            })
            // Load map and plot location points
            .then(() => this.mapSightings())
        }
    } 
}
</script>

<style>
#mapContainer {
    width: 80%;
    height: 500px;
    margin: 0 auto;
}
</style>