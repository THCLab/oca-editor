import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca
import Communicator from './communicator'
import { EventHandlerConstant, eventBus } from './template/handler/event_handler'
import { TYPE_MAPPER } from './config/constants'

const schemaStorage = []

const findSchema = (uuid) => {
  return schemaStorage.find((s) => s.uuid == uuid)
}

export const initOdcaCommunication = () => {
  Communicator.subscribe('form_rendered', ({ schema, form }) => {
    eventBus.$emit('msg.form_rendered', { schema, form })
  })
  Communicator.subscribe('store_schema', schema => {
    schemaStorage.push(schema)
  })

  eventBus.$on('msg.add_control', (args) => {
    const schema = findSchema(args.schemaUuid)
    const attribute = new odca.AttributeDto(
      args.controlInfo.attrName,
      TYPE_MAPPER.inputType[args.controlInfo.type],
      args.controlInfo.isPII,
      args.controlInfo.label,
      args.controlInfo.dateFormat
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

    const attribute = new odca.AttributeDto(
      args.control.attrName,
      TYPE_MAPPER.inputType[args.control.type],
      args.control.isPII,
      args.control.label,
      args.control.dateFormat
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
}
