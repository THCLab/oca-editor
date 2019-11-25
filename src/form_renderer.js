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
    let attrType = schemaData.schemaBase.attributesType.get_11rb$(attrUuid)

    let label, format, options, encoding, information
    const labelOverlays = schemaData.labelOverlays.array_hd7ov6$_0
    label = labelOverlays[0].attrLabels.get_11rb$(attrUuid)

    const formatOverlays = schemaData.formatOverlays.array_hd7ov6$_0
    if (formatOverlays.length != 0) {
      format = formatOverlays[0].attrFormats.get_11rb$(attrUuid)
    }

    options = attrType.includes("Array") ? [] : null
    const entryOverlays = schemaData.entryOverlays.array_hd7ov6$_0
    if (entryOverlays.length != 0) {
      for(let entryOverlay of entryOverlays) {
        let entries = entryOverlay.attrEntries.get_11rb$(attrUuid)
        if (entries) {
          attrType = "Array[Text]"
          options = entries.array_hd7ov6$_0.map(entry => {
            return { id: "x", text: entry }
          })
          break
        }
      }
    }

    const encodeOverlays = schemaData.encodeOverlays.array_hd7ov6$_0
    encoding = encodeOverlays[0].attrEncoding.get_11rb$(attrUuid)
    const defaultEncoding = encodeOverlays[0].defaultEncoding

    const informationOverlays = schemaData.informationOverlays.array_hd7ov6$_0
    if (informationOverlays.length != 0) {
      for(let informationOverlay of informationOverlays) {
        information = informationOverlay.attrInformation.get_11rb$(attrUuid)
        if (information) {
          break
        }
      }
    }

    const type = TYPE_MAPPER.typeInput[attrType] || "text"
    const controlName = _.domUniqueID(`control_${type}_`)

    const control = {...FORM_CONSTANTS.Control,
      ...{
        uuid: attrUuid,
        type: type,
        name: controlName,
        fieldName: controlName,
        attrName: attrName,
        isPII: pii_attributes.includes(attrUuid),
        label: label || null,
        dateFormat: format || null,
        dataOptions: options || null,
        encoding: encoding || defaultEncoding,
        information: information,
        timeFormat: "HH:mm"
      }
    }
    form.section.row.controls.push(control)
  }

  Communicator.publish('form_rendered', { schema, form })
}
