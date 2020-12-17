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
            sightings: []
        }
    },
    mounted() {
        this.loadSightings()
    },
    methods: {
        loadSightings() {
            this.$store.dispatch("get_sightings")
            .then(res => {
                for(let i = 0; i < 100; i++) {
                    // Create new array instance of two numbers for mapbox marker coordinate
                    const arrCoordinates = new Array()
                    arrCoordinates.push(res[i].longitude)
                    arrCoordinates.push(res[i].latitude)

                    const sightingEntry = {
                        entity: res[i].data_source_entity,
                        created: res[i].created,
                        witness: res[i].data_source_witness,
                        comments: res[i].data_source_comments,
                        coordinates: arrCoordinates
                    }
                    this.sightings.push(sightingEntry)
                }

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
                for (let i = 0; i < this.sightings.length; i++) {
                    new mapboxgl.Marker()
                    .setLngLat(this.sightings[i].coordinates)
                    .addTo(map)
                }
            })
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