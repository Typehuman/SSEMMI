<template>
    <div id="about-container">
        <div id="about-desc">
            <h1>About Acartia</h1>
            <p>
              Acartia is a decentralized data cooperative for sharing marine animal locations within the Salish Sea.
              It is named for one of the smallest animals in Puget Sound -- microscopic copepods
              -- but was built to recover one of the biggest  -- the endangered Southern Resident killer whales.
            </p>
            <p>
              A demonstration of the democratizing power of Web 3.0 tech, it is capable of aggregating
              real-time observations from a growing ecosystem of applications and sharing archived observations
              from decades of monitoring effort.
            </p>

          <p>
            The current data cooperative was created by <a href="https://typehuman.com">TypeHuman</a> as open source code with an open API first utilized
            by <a href="https://conserve.io/">Conserve.io</a> via the Whale Alert and Ocean Alert mobile apps. Initial data providers and beta-testers of
            mobile and web apps, as well as the cooperative itself, are two open community science networks in
            Puget Sound: <a href="https://www.orcanetwork.org/">Orca Network</a> and <a href="https://www.orcasound.net/">Orcasound</a>. Phase one of the project has been coordinated and funded by
            <a href="https://www.resolveconservation.com/">Resolve Conservation</a> and <a href="https://beamreach.blue/">Beam Reach</a>.
          </p>

          <p>
            P.S.: Acartia is a common type of zooplankton, a copepod at the bottom of the Salish Sea food chain that is
            topped by killer whales. We welcome collaborators interested in monitoring, modeling, and conserving the
            Salish Sea --  from biological oceanographers to marine biologists to birders to marine mammal stewards.
            Drop us an email, contribute via our Github repository, or sign up to provide or utilize data.
          </p>
        </div>
        <div id="about-links">
            <mdb-row>
                <mdb-btn outline="black" id="about-contact-btn" onclick="window.open('mailto:info@acartia.io');">Contact Us</mdb-btn>
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
