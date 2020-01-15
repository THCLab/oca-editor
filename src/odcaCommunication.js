import { EventHandlerConstant, eventBus, exportToZip, createSchemaFromForm } from 'odca-form'
import { get_schemas } from './persistence'
import {SethPhatToaster} from "./config/toaster";

export const initOdcaCommunication = () => {
  eventBus.$on(EventHandlerConstant.EXPORT_FORM, (form) => {
    let schema

    try {
      const baseForm = get_schemas().find(s => s.uuid == form.uuid);
      if (!baseForm) {
          throw "Form cannot be exported"
      }
      schema = createSchemaFromForm(baseForm, form)
    } catch(e) {
      SethPhatToaster.error(e);
    }

    if (schema) {
      exportToZip(schema)
    }
  })
}
