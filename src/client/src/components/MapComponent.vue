<template>
    <div id='mapContainer'></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
    name: 'Map',
    data() {
        return {
            mapboxKey: process.env.VUE_APP_MAPBOX_KEY,
        }
    },
    mounted() {
        mapboxgl.accessToken = this.mapboxKey

        new mapboxgl.Map({
            container: 'mapContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-122.312490, 47.951812],
            zoom: 7.0
        });
    }
}
</script>

<style>
#mapContainer {
    width: 80%;
    height: 400px;
    margin: 0 auto;
}
</style>