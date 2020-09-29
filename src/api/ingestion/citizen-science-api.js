import request from 'request'
import { dbPost } from '../../services/orbitdb'
import GSpreadsheet from 'google-spreadsheet'
import { promisify } from 'util'

/**
 *----- CITIZEN SCIENCE GOOGLE SHEET DATA -> DB (LOADING METHODS) -----
 */

/**
 * citizenSciSheet is the URL to retreive data from Citizen Science google spreadsheet entries
 */