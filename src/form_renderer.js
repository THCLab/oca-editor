import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca
import { FORM_CONSTANTS } from './config/constants'

export function renderForm(schemaData) {
  const schema = {
    name: schemaData.schemaBase.name,
    description: schemaData.schemaBase.description,
    did: "",
    version: "1"
  }
  const form = {
    section: {
      name: "",
      label: "",
      clientKey: "",
      order: 0,
      row: {
        name: "",
        label: "",
        order: 0,
        controls: []
      },
      labelPosition: "left",
      isDynamic: false,
      minInstance: 1,
      maxInstance: 0,
      instances: []
    },
    type: ""
  }

  const pii_attributes = schemaData.schemaBase.piiAttributes.array_hd7ov6$_0
  const iterator = schemaData.schemaBase.attributesUuid.entries.iterator()
  while(iterator.hasNext()) {
    let element = iterator.next()
    let attrUuid = element.key
    let attrName = element.value

    const type = typeMapper[
      schemaData.schemaBase.attributesType.get_11rb$(attrUuid)
    ] || "text"

    const fieldId = Math.floor(Math.random() * 10000000);
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
        name: `control_${type}_${fieldId}`,
        fieldName: `control_${type}_${fieldId}`,
        attrName: attrName,
        isPII: pii_attributes.includes(attrUuid),
        label: label,
        dateFormat: format,
        timeFormat: "HH:mm",
      }
    }
    form.section.row.controls.push(control)
  }

  return { schema, form }
}

const typeMapper = {
  "Text": "text",
  "Date": "datepicker",
  "Array[Text]": "select",
  "Array[Object]": "select",
  "Boolean": "checkbox",
  "Number": "number"
}
