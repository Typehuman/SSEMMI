import { dbGetAll } from '../../services/orbitdb'
import { Parser, transforms } from 'json2csv'

export const exportCSV = async () => {
  try {
    const exportData = await dbGetAll()
    const fields = ['ssemmi_id', 'entry_id', 'data_source_name', 'data_source_entity',
      'created', 'photo_url', 'no_sighted', 'profile.name', 'profile.website', 'profile.logo',
      'latitude', 'longitude', 'data_source_witness', 'data_source_comments']
    const transform = [transforms.unwind({ paths: ['profile'] })]
    const jsonParser = new Parser({
      fields,
      transform
    })
    return jsonParser.parse(exportData)
  } catch (e) {
    throw e
  }
}
