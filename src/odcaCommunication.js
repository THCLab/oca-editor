import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca
import Communicator from './communicator'
import { EventHandlerConstant, eventBus } from './template/handler/event_handler'
import { exportToZip } from './zip_resolver'
import { createSchemaFromForm } from './create_schema_from_form'

const schemaStorage = []

const findSchema = (uuid) => {
  return schemaStorage.find((s) => s.uuid == uuid)
}

export const initOdcaCommunication = () => {
  const facade = new odca.Facade()

  Communicator.subscribe('form_rendered', renderedForm => {
    eventBus.$emit(EventHandlerConstant.FORM_RENDERED, renderedForm)
  })
  Communicator.subscribe('store_schema', schema => {
    schemaStorage.push(schema)
  })

  eventBus.$on(EventHandlerConstant.EXPORT_FORM, (form) => {
    let schema

    try {
      schema = createSchemaFromForm(form)
    } catch(e) {
      SethPhatToaster.error(e);
    }

    if (schema) {
      exportToZip(JSON.parse(facade.serialize(schema)))
    }
  })
}
