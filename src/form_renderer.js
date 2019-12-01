import { FORM_CONSTANTS, TYPE_MAPPER } from './config/constants'
import Communicator from './communicator'

export function renderForm(schemaData) {
  Communicator.publish('store_schema', schemaData)
  const schema = {
    name: schemaData.schemaBase.name,
    description: schemaData.schemaBase.description,
    classification: schemaData.schemaBase.classification,
    uuid: schemaData.uuid,
    did: "",
    version: "1"
  }
  const form = {
    uuid: schemaData.uuid,
    sections: [],
    type: ""
  }

  const leftAttributes = schemaData.schemaBase.attributesUuid
  const pii_attributes = schemaData.schemaBase.piiAttributes.array_hd7ov6$_0

  const labelOverlays = schemaData.labelOverlays.array_hd7ov6$_0

  const generateControl = (attrUuid, attrName) => {
    let attrType = schemaData.schemaBase.attributesType.get_11rb$(attrUuid)

    let label, format, options, encoding, information
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

    return {...FORM_CONSTANTS.Control,
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
  }

  const labelOverlay = labelOverlays[0]
  const categories = labelOverlay.attrCategories.array_hd7ov6$_0
  categories.forEach(categoryLink => {
    const section = _.cloneDeep(FORM_CONSTANTS.Section)
    section.name = _.domUniqueID("section_")
    section.clientKey = section.name

    const categoryLabel = labelOverlay.categoryLabels.get_11rb$(categoryLink)
    section.label = categoryLabel
    form.sections.push(section)

    const categoryAttributes = labelOverlay.categoryAttributes.get_11rb$(categoryLink).array_hd7ov6$_0

    categoryAttributes.forEach(attrUuid => {
      let attrName = leftAttributes.remove_11rb$(attrUuid)
      let control = generateControl(attrUuid, attrName)
      section.row.controls.push(control)
    })
  })
  if (leftAttributes.size > 0) {
    const section = _.cloneDeep(FORM_CONSTANTS.Section)
    section.name = _.domUniqueID("section_")
    section.clientKey = section.name
    form.sections.push(section)

    const iterator = leftAttributes.entries.iterator()
    while(iterator.hasNext()) {
      let element = iterator.next()
      let attrUuid = element.key
      let attrName = element.value
      let control = generateControl(attrUuid, attrName)
      section.row.controls.push(control)
    }
  }

  Communicator.publish('form_rendered', { schema, form })
}
