import { dbPost } from '../../services/orbitdb'
import { GoogleSpreadsheet } from 'google-spreadsheet'

/**
 *----- CITIZEN SCIENCE GOOGLE SHEET DATA -> DB (LOADING METHODS) -----
 */

/**
 * citizenSciDoc is the URL to retreive data from Citizen Science google spreadsheet entries
 * shared from Resolve Conservation. Some helpful reference to implementing the 
*/

// Load environment variables for details
const gKey = process.env.GOOGLE_SPREADSHEET_KEY
const gClientEmail = process.env.GOOGLE_SPREADSHEET_CLIENT_EMAIL
const citizenSciDoc = process.env.CITIZEN_SCIENCE_GOOGLE_ID

// Method to map relevant fields from the data into the ssemmi db
/** NOTE: ipfs-http doesn't support CBOR tags so the date fields had to be stringified
refer to https://github.com/ipfs/js-ipfs/issues/3043 **/

function ssemmiFormatting (entryData) {
    // var source_input = {
    //     "ssemmi_id": "CITISCI" + entryData.id,
    //     "entry_id": new Date().getTime(),
    //     "data_source_name": "Citizen-Science",
    //     "data_source_entity": "resolveconservation.com",
    //     "data_source_id": entryData.id,
    //     "created": entryData.created,
    //     "photo_url": entryData.photo_url,
    //     "no_sighted": entryData.number_sighted,
    //     "latitude": entryData.latitude,
    //     "longitude": entryData.longitude,
    //     "data_source_witness": entryData.usernm,
    //     "trusted": entryData.trusted,
    //     "data_source_comments": entryData.comments,
    //     "ssemmi_date_added": String(new Date())
    // }
    // return source_input

    var bogus = {
        "Record#": entryData,
        "Date": 2,
        "Time": 3,
        "OrcaId": 4,
        "NumberandBehaviorof": 5
    }

    console.log(bogus)
}

// Method to load spreadsheet from Google
export const csLoadSpreadsheet = async () => {
    // Authenticating access to specified Google spreadsheets
    const gDoc = new GoogleSpreadsheet(citizenSciDoc)
    await gDoc.useServiceAccountAuth({
        client_email: gClientEmail,
        private_key: gKey
    })
    // Loads document properties and worksheets
    await gDoc.loadInfo()

    // Iterate through the sheets within the documents using length caching for optimum speed
    var i = 0, gSheets = gDoc.sheetCount
    while (i < 1) {
        // Set current worksheet
        const sheet = gDoc.sheetsByIndex[i]
        // Load all rows (skipping the header with the offset)
        const sheetRows = await sheet.getRows( {offset: 0} )

        sheetRows.forEach( (index) => {
            console.log(`index: ${index.NumberandBehaviorof} \n`);
        })

        // sheetRows.forEach(entry => {
        //     ssemmiFormatting(entry)
        // })

        // for (let index = 1; index < 3; index++) {
        //     console.log(`Date: ${sheetRows[index].date} \n`)
        //     console.log(`Orca ID: ${sheetRows[index].orcaid} \n`)
        // }

        // console.log(`Title: ${sheet.title} and Rows: ${sheet.rowCount} \n`)
        i++
    }
}