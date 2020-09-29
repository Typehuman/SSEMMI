import request from 'request'
import { dbPost } from '../../services/orbitdb'
import GSpreadsheet from 'google-spreadsheet'
import { promisify } from 'util'

/**
 *----- ORCA MAP GOOGLE SHEET API DATA -> DB (LOADING METHODS) -----
 */

/**
 * orcaMapSheet is the URL to retreive data from Orca Map Project google spreadsheet entries
 */