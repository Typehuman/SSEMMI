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
        <div id="about-links">
            <mdb-row>
                <mdb-btn outline="black" id="about-contact-btn">Contact Us</mdb-btn>
            </mdb-row>
            <mdb-row>
                <mdb-btn outline="black" id="about-contact-btn"><a href="https://github.com/Typehuman/SSEMMI">Github <i class="fab fa-github"></i></a></mdb-btn>
            </mdb-row>
        </div>
    </div>
</template>

<script>
import { mdbRow, mdbBtn } from 'mdbvue'

export default {
    name: 'About',
    components: {
        mdbRow,
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

#about-links {
    padding: 5%;
    margin-left: 5%;
    display: inline-table;
}

#about-links .row{
    display: grid;
}

#about-contact-btn a {
    color:black;
}
</style>