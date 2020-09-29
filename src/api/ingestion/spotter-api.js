import request from 'request'
import { dbPost } from '../../services/orbitdb'

/**
 *----- DATA TO DB LOADING METHODS -----
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
var currentDayFormat = `${yyyy}-${mm}-${dd}`

//export const conserveApi = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01&end=2020-09-18&species=Orcinus%20orca'
//export const conserveApi = `https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=${currentDayFormat}&species=Orcinus%20orca`
export const conserveApi = `https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-09-18&species=Orcinus%20orca`

// Retreive data from the URL
export const loadApi = async (api) => {
    request(api, (err, resp, body) => {
        if (!err) {
            // Parsing the JSON from the data, parameters are 'count' and 'results'
            var jsonData = JSON.parse(body)
            var count = 0

            // Iterate over the sightings data to fill DB
            for (var i = 0; i < jsonData.results.length; i++ ) {
                // Mapping relevant fields from the data into the ssemmi db
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
                    "ssemmi_date_added": currentDate
                }

                // Wrap in a try catch to put into the db
                try {
                    console.log(`Adding data from date ${currentDayFormat} to the DB....`)
                    //dbPost(source_input)
                    count+= 1
                    console.log(`Entry count: ${count}\n`)
                    console.log(source_input)
                    console.log(`SSEMMI ID ${source_input.ssemmi_id} successfully added to the db \n`)
                } catch (error) {
                    console.log(error);
                }
            }
            // Show the number of entries
            console.log(`There were ${count} of entries added from Spotter API`)
        }
    })
}