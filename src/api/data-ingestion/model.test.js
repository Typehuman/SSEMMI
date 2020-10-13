import { DataIngestion } from '.'
import { User } from '../user'

let user, dataIngestion

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  dataIngestion = await DataIngestion.create({ ssemmi_creator: user, entry_id: 'test', data_source_name: 'test', data_source_entity: 'test', data_source_id: 'test', created: 'test', photo_url: 'test', no_sighted: 'test', latitude: 'test', longitude: 'test', data_source_witness: 'test', trusted: 'test', data_source_comments: 'test', ssemmi_data_added: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = dataIngestion.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dataIngestion.id)
    expect(typeof view.ssemmi_creator).toBe('object')
    expect(view.ssemmi_creator.id).toBe(user.id)
    expect(view.entry_id).toBe(dataIngestion.entry_id)
    expect(view.data_source_name).toBe(dataIngestion.data_source_name)
    expect(view.data_source_entity).toBe(dataIngestion.data_source_entity)
    expect(view.data_source_id).toBe(dataIngestion.data_source_id)
    expect(view.created).toBe(dataIngestion.created)
    expect(view.photo_url).toBe(dataIngestion.photo_url)
    expect(view.no_sighted).toBe(dataIngestion.no_sighted)
    expect(view.latitude).toBe(dataIngestion.latitude)
    expect(view.longitude).toBe(dataIngestion.longitude)
    expect(view.data_source_witness).toBe(dataIngestion.data_source_witness)
    expect(view.trusted).toBe(dataIngestion.trusted)
    expect(view.data_source_comments).toBe(dataIngestion.data_source_comments)
    expect(view.ssemmi_data_added).toBe(dataIngestion.ssemmi_data_added)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = dataIngestion.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dataIngestion.id)
    expect(typeof view.ssemmi_creator).toBe('object')
    expect(view.ssemmi_creator.id).toBe(user.id)
    expect(view.entry_id).toBe(dataIngestion.entry_id)
    expect(view.data_source_name).toBe(dataIngestion.data_source_name)
    expect(view.data_source_entity).toBe(dataIngestion.data_source_entity)
    expect(view.data_source_id).toBe(dataIngestion.data_source_id)
    expect(view.created).toBe(dataIngestion.created)
    expect(view.photo_url).toBe(dataIngestion.photo_url)
    expect(view.no_sighted).toBe(dataIngestion.no_sighted)
    expect(view.latitude).toBe(dataIngestion.latitude)
    expect(view.longitude).toBe(dataIngestion.longitude)
    expect(view.data_source_witness).toBe(dataIngestion.data_source_witness)
    expect(view.trusted).toBe(dataIngestion.trusted)
    expect(view.data_source_comments).toBe(dataIngestion.data_source_comments)
    expect(view.ssemmi_data_added).toBe(dataIngestion.ssemmi_data_added)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
