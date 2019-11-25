import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca
import Communicator from './communicator'
import { EventHandlerConstant, eventBus } from './template/handler/event_handler'
import { TYPE_MAPPER } from './config/constants'
import { exportToZip } from './zip_resolver'

const schemaStorage = []

const findSchema = (uuid) => {
  return schemaStorage.find((s) => s.uuid == uuid)
}

export const initOdcaCommunication = () => {
  const facade = new odca.Facade()

  Communicator.subscribe('form_rendered', ({ schema, form }) => {
    eventBus.$emit('msg.form_rendered', { schema, form })
  })
  Communicator.subscribe('store_schema', schema => {
    schemaStorage.push(schema)
  })

  eventBus.$on('msg.add_control', (args) => {
    const schema = findSchema(args.schemaUuid)
    const entries = (args.controlInfo.dataOptions &&
      args.controlInfo.dataOptions.length >= 0) ?
      args.controlInfo.dataOptions.map(o => o.text) : null

    const attribute = new odca.AttributeDto(
      args.controlInfo.attrName,
      TYPE_MAPPER.inputType[args.controlInfo.type],
      args.controlInfo.isPII,
      args.controlInfo.label,
      args.controlInfo.dateFormat,
      entries,
      args.controlInfo.encoding
    )

    eventBus.$emit(args.controlInfo.name, attribute.uuid)
    try {
      schema.add(attribute)
    } catch(e) {
      if (e.name == "Exception") {
        SethPhatToaster.error(e.message);
      } else {
        throw e
      }
    }
  })

  eventBus.$on(EventHandlerConstant.REMOVE_CONTROL, (args) => {
    const schema = findSchema(args.schemaUuid)
    try {
      schema.delete(args.controlInfo.uuid)
    } catch(e) {
      if (e.name == "Exception") {
        SethPhatToaster.error(e.message);
      } else {
        throw e
      }
    }
  })

  eventBus.$on(EventHandlerConstant.ON_APPLY_EDITOR_SIDEBAR, (args) => {
    const schema = findSchema(args.formUuid)
    const entries = (args.control.dataOptions &&
      args.control.dataOptions.length >= 0) ?
      args.control.dataOptions.map(o => o.text) : null

    const attribute = new odca.AttributeDto(
      args.control.attrName,
      TYPE_MAPPER.inputType[args.control.type],
      args.control.isPII,
      args.control.label,
      args.control.dateFormat,
      entries,
      args.control.encoding
    )

    try {
      schema.modify(args.control.uuid, attribute)
    } catch(e) {
      if (e.name == "Exception") {
        SethPhatToaster.error(e.message);
      } else {
        throw e
      }
    }
  })

  eventBus.$on("export", (schemaUuid) => {
    const schema = findSchema(schemaUuid)
    exportToZip(JSON.parse(facade.serialize(schema)))
  })
}
