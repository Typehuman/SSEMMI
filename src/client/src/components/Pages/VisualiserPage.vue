<template>
    <div>
        <!-- <CardComponent componentHeader="Sightings Map"> -->
            <Map />
        <!-- </CardComponent> -->
    </div>
</template>

<script>
// import CardComponent from '../CardComponent'
import Map from '../MapComponent'

export default {
    name: 'Visualiser',
    components: {
        // CardComponent,
        Map
    },
}
</script>
