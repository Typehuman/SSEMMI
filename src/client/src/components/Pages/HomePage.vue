<template>
    <div>
        <Map id="home-map"></Map>
        <card-component id="home-about-card" :withHeader="false">
            <h1>About SSEMMI</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <mdb-btn outline="black" tag="a" href="/about">Learn More</mdb-btn>
        </card-component>
    </div>
</template>

<script>
import Map from '../MapComponent'
import CardComponent from '../CardComponent.vue'
import { mdbBtn } from 'mdbvue'

export default {
    name: 'Home',
    components: {
        Map,
        CardComponent,
        mdbBtn
    },
}
</script>

<style scoped>

#home-about-card {
    width: 40%;
    top: 6vh;
    right: -30vh;
    margin: 10px;
    background-color: transparent;
    position: fixed;
    display: inline-block;
}
</style>
