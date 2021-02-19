<template>
    <div id="about-container">        
        <div id="about-desc">
            <h1>About SSEMMI</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </p>
        </div>
        <mdb-btn outline="black" id="about-btn-contact">Contact Us</mdb-btn>
    </div>
</template>

<script>
import { mdbBtn } from 'mdbvue'

export default {
    name: 'About',
    components: {
        mdbBtn
    },
}
</script>

<style>
#about-container {
    /* align-content: ; */
}

#about-desc {
    text-align: left;
    width: 50%;
    padding: 5%;
    margin: auto;
    position: relative;
    margin-left: 5%;
    display: inline-table;
}

#about-contact-btn {
    float: right;
}
</style>