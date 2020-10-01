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
function ssemmiFormatting (entryData, count) {
    var source_input = {
        "ssemmi_id": "CITISCI" + count,
        "entry_id": new Date().getTime(),
        "data_source_name": "Citizen-Science",
        "data_source_entity": "Resolve Conservation",
        "data_source_id": count,
        "created": `${entryData['Date']} ${entryData['Time']}`,
        "photo_url": "N/A",
        "no_sighted": "N/A",
        "latitude": entryData['latitude'],
        "longitude": entryData['longitude'],
        "data_source_witness": entryData['Initial Sighting Source'],
        "trusted": "N/A",
        "data_source_comments": `${entryData['Number and Behavior of Whales']}`,
        "ssemmi_date_added": String(new Date())
    }
    console.log(source_input)
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
        const sheet = gDoc.sheetsByIndex[1]
        // Load all rows (skipping the header with the offset)
        const sheetRows = await sheet.getRows( {offset: 0} )

        // Map all row values from current workbook as JSON payload
        sheetRows.forEach( (entry, count) => {
            // Assign row index by adding the row count as it starts from zero
            const rowIndex = count + 1
            ssemmiFormatting(entry, rowIndex)
        })

        // Increment to advance to next workbook
        i++
    }
}