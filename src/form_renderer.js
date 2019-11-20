import { FORM_CONSTANTS, TYPE_MAPPER } from './config/constants'
import Communicator from './communicator'

export function renderForm(schemaData) {
  Communicator.publish('store_schema', schemaData)
  const schema = {
    name: schemaData.schemaBase.name,
    description: schemaData.schemaBase.description,
    did: "",
    version: "1"
  }
  const form = {
    uuid: schemaData.uuid,
    section: _.cloneDeep(FORM_CONSTANTS.Section),
    type: ""
  }

  const pii_attributes = schemaData.schemaBase.piiAttributes.array_hd7ov6$_0
  const iterator = schemaData.schemaBase.attributesUuid.entries.iterator()
  while(iterator.hasNext()) {
    let element = iterator.next()
    let attrUuid = element.key
    let attrName = element.value

    const type = TYPE_MAPPER.typeInput[
      schemaData.schemaBase.attributesType.get_11rb$(attrUuid)
    ] || "text"
    const controlName = _.domUniqueID(`control_${type}_`)

    let label, format
    const labelOverlays = schemaData.labelOverlays.array_hd7ov6$_0
    label = labelOverlays[0].attrLabels.get_11rb$(attrUuid)

    const formatOverlays = schemaData.formatOverlays.array_hd7ov6$_0
    if (formatOverlays.length != 0) {
      format = formatOverlays[0].attrFormats.get_11rb$(attrUuid)
    }

    const control = {...FORM_CONSTANTS.Control,
      ...{
        uuid: attrUuid,
        type: type,
        name: controlName,
        fieldName: controlName,
        attrName: attrName,
        isPII: pii_attributes.includes(attrUuid),
        label: label,
        dateFormat: format,
        timeFormat: "HH:mm"
      }
    }
    form.section.row.controls.push(control)
  }

  Communicator.publish('form_rendered', { schema, form })
}
