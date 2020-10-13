import mongoose, { Schema } from 'mongoose'

const dataIngestionSchema = new Schema({
  ssemmi_creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  entry_id: {
    type: String
  },
  data_source_name: {
    type: String
  },
  data_source_entity: {
    type: String
  },
  data_source_id: {
    type: String
  },
  created: {
    type: String
  },
  photo_url: {
    type: String
  },
  no_sighted: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  data_source_witness: {
    type: String
  },
  trusted: {
    type: String
  },
  data_source_comments: {
    type: String
  },
  ssemmi_data_added: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

dataIngestionSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      ssemmi_creator: this.ssemmi_creator.view(full),
      entry_id: this.entry_id,
      data_source_name: this.data_source_name,
      data_source_entity: this.data_source_entity,
      data_source_id: this.data_source_id,
      created: this.created,
      photo_url: this.photo_url,
      no_sighted: this.no_sighted,
      latitude: this.latitude,
      longitude: this.longitude,
      data_source_witness: this.data_source_witness,
      trusted: this.trusted,
      data_source_comments: this.data_source_comments,
      ssemmi_data_added: this.ssemmi_data_added,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('DataIngestion', dataIngestionSchema)

export const schema = model.schema
export default model
