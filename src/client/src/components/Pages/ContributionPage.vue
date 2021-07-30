<template>
    <div id="about-container">
        <div class="page-desc">
            <h1>Integrating with Acartia</h1>
            <p>
              Firstly, thank you for your interest to contribute data to Acartia!
            </p>
            <p>
              The first step is to ensure you have generated a token for your application.
              You can do this on the <a href="/dashboard">Contribute</a> page.
            </p>
          <p>Next, copy your token - avoid storing it directly in your code. We recommend either using the Secrets section
            of your deployment tool, or using an environment file (and avoid committing your environment file to your code repository). </p>

          <p>The example below shows how you can use your token to retrieve sightings from the API.</p>
          <pre><code>
            # For example:
            import axios from 'axios'

            const requestAuth = {
            headers: {
            'Authorization': 'Bearer ' + &lt;YOUR TOKEN&gt;,
            'Content-Type': 'application/json'
            }
            }

            // Pass headers of user bearer token to access sightings
            axios.get('https://acartia.io/v1/sightings', requestAuth)
            // Add list of users into the store of user requests
            .then( sightings => {
            ## Actions that you want to take with the sightings
            })
            .catch(err => {
            console.error(`There was an error getting sightings: ${err}`)
            })
            </code></pre>
            <p>
              Finally, there is the structure of the data. When you send data to the
              <a href="https://github.com/Typehuman/SSEMMI/blob/main/DOCS.md#sightings">Sightings Api</a>
              , only data that fits in the format will be stored. The format is shown below;
            </p>
            <pre><code>
              data_source_name: The name of the data entry
              data_source_entity: Your organisation
              data_source_id: the ID of the record in your system
              created: When was the sighting record created
              photo_url: The URL of the photo sighting
              no_sighted: The number of whales sighted
              latitude: Latitude of the sighting
              longitude: Longitude of the sighting
              data_source_witness: The name of the witness
              data_source_comments: Any comments added by the witness
            </code></pre>
        </div>
        <div class="page-links">
            <mdb-row>
                <mdb-btn outline="black" class="contact-btn" onclick="window.open('mailto:info@acartia.io');">Questions?</mdb-btn>
            </mdb-row>
            <mdb-row>
                <mdb-btn outline="black" class="contact-btn"><a href="https://github.com/Typehuman/SSEMMI">Github <i class="fab fa-github"></i></a></mdb-btn>
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

.page-desc {
    text-align: left;
    width: 50%;
    padding: 5%;
    margin: auto;
    position: relative;
    margin-left: 5%;
    display: inline-table;
}

.page-links {
    padding: 5%;
    margin-left: 5%;
    display: inline-table;
}

.page-links .row{
    display: grid;
}

.contact-btn a {
    color:black;
}
</style>
