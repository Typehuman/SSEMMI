<template>
    <div>
        <Map id="home-map"></Map>
        <card-component id="home-about-card">
            <h1>About SSEMMI</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
        </card-component>
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
#home-map {
    pointer-events: none;
}

#home-about-card {
    width: 20%;
    top: 6vh;
    left: 1vh;
    margin: 10px;
    padding: 10px 20px;
    background-color: transparent;
    position: fixed;
}
</style>
