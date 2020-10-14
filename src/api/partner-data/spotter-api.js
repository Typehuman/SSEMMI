import request from 'request'
import { dbPost } from '../../services/orbitdb'

/**
 *----- SPOTTER API DATA -> DB (LOADING METHODS) -----
 */

/**
 * conserveApi is the URL to retreive data from Conserve.IO app
 * The BBOX parameter on the URL indicates the location
 * and the start/end parameter marks the date of sighting, with 7 days range as default
 * species parameter specifies the types of whales, but in our case it should be 'Orcinus orca'
 */

// Specify current date to put into the API parameter
var currentDate = new Date()
var dd = String(currentDate.getDate()).padStart(2, '0')
var mm = String(currentDate.getMonth() + 1).padStart(2, '0') //January is 0
var yyyy = currentDate.getFullYear()

// Convert the current date to string for JSON load - refer to the source_input date variable
currentDate = String(currentDate)

// Formatting on current date for API parameter
var currentDayFormat = `${yyyy}-${mm}-${dd}`
export const conserveApi = `https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01&end=${currentDayFormat}&species=Orcinus%20orca`

// Retreive data from the URL
export const loadApi = async (api) => {
    // Request connection to the API
    request(api, (err, resp, body) => {
        console.log("Connecting to Spotter API... \n");
        if (!err) {
            // Parsing the JSON from the data, parameters are 'count' and 'results'
            var jsonData = JSON.parse(body)
            var count = 0

            // Iterate over the sightings data to fill DB
            for (var i = 0; i < jsonData.results.length; i++ ) {
                // Mapping relevant fields from the data into the ssemmi db
                /** NOTE: ipfs-http doesn't support CBOR tags so the date fields had to be stringified
                refer to https://github.com/ipfs/js-ipfs/issues/3043 **/
                var source_input = {
                    "ssemmi_id": "SPOTTER" + jsonData.results[i].id,
                    "entry_id": new Date().getTime(),
                    "data_source_name": "Spotter-API",
                    "data_source_entity": "Conserve.io",
                    "data_source_id": jsonData.results[i].id,
                    "created": jsonData.results[i].created,
                    "photo_url": jsonData.results[i].photo_url,
                    "no_sighted": jsonData.results[i].number_sighted,
                    "latitude": jsonData.results[i].latitude,
                    "longitude": jsonData.results[i].longitude,
                    "data_source_witness": jsonData.results[i].usernm,
                    "trusted": jsonData.results[i].trusted,
                    "data_source_comments": jsonData.results[i].comments,
                    "ssemmi_date_added": currentDate
                }

                // Wrap in a try catch to put into the db
                try {
                    // Add data into SSEMMI decentralised database
                    console.log(`Adding data from date ${currentDayFormat} to the DB....`)
                    dbPost(source_input)
                    // Tracks the entry count to log/trace
                    count+= 1
                    console.log(`Entry count: ${count}\n`)
                    // Display data from entry load
                    console.log(source_input)
                    console.log(`SSEMMI ID ${source_input.ssemmi_id} successfully added to the db \n`)
                } catch (error) {
                    console.log(error);
                }
            }
            // Show the number of entries of the day from the Spotter API
            console.log(`There were ${jsonData.results.length} entries added from Spotter API \n`)
        }
    })
}