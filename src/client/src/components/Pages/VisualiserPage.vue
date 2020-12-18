<template>
    <div style="card">
        <CardComponent componentHeader="Sightings Map">
            <Map />
        </CardComponent>
    </div>
</template>

<script>
import CardComponent from '../CardComponent'
import Map from '../MapComponent'

export default {
    name: 'Visualiser',
    components: {
        CardComponent,
        Map
    },
}
</script>

<style>
.card {
    left: 50%;
    top: 5%;
}
</style>