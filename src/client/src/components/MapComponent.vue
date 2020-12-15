<template>
    <div id='mapContainer' style='width: 400px; height: 300px;'></div>
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
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }
}
</script>
