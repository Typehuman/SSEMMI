<template>
    <div>
        <Map id="home-map"></Map>
        <card-component id="home-about-card"></card-component>
    </div>
</template>

<script>
import Map from '../MapComponent'
import CardComponent from '../CardComponent.vue'

export default {
    name: 'Home',
    components: {
        Map,
        CardComponent
    },
}
</script>

<style scoped>
#home-about-card {
    width: 20%;
    top: 6vh;
    left: 1vh;
    margin: 10px;
    padding: 10px 20px;
    background-color: white;
    position: relative;
}
</style>
