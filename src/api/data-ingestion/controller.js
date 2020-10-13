import { success, notFound, authorOrAdmin } from '../../services/response/'
import { DataIngestion } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  DataIngestion.create({ ...body, ssemmi_creator: user })
    .then((dataIngestion) => dataIngestion.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DataIngestion.count(query)
    .then(count => DataIngestion.find(query, select, cursor)
      .populate('ssemmi_creator')
      .then((dataIngestions) => ({
        count,
        rows: dataIngestions.map((dataIngestion) => dataIngestion.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DataIngestion.findById(params.id)
    .populate('ssemmi_creator')
    .then(notFound(res))
    .then((dataIngestion) => dataIngestion ? dataIngestion.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  DataIngestion.findById(params.id)
    .populate('ssemmi_creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'ssemmi_creator'))
    .then((dataIngestion) => dataIngestion ? Object.assign(dataIngestion, body).save() : null)
    .then((dataIngestion) => dataIngestion ? dataIngestion.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  DataIngestion.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'ssemmi_creator'))
    .then((dataIngestion) => dataIngestion ? dataIngestion.remove() : null)
    .then(success(res, 204))
    .catch(next)
