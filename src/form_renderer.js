import * as odcaPkg from 'odca'
const odca = odcaPkg.com.thehumancolossuslab.odca

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
  const iterator = schemaData.schemaBase.attributes.entries.iterator()
  while(iterator.hasNext()) {
    let element = iterator.next()
    let key = element.key
    let value = element.value

    const type = typeMapper[value] || "text"

    const fieldId = Math.floor(Math.random() * 10000000);
    let label, format
    const labelOverlays = schemaData.labelOverlays.array_hd7ov6$_0
    label = labelOverlays[0].attrLabels.get_11rb$(key)

    const formatOverlays = schemaData.formatOverlays.array_hd7ov6$_0
    if (formatOverlays.length != 0) {
      format = formatOverlays[0].attrFormats.get_11rb$(key)
    }

    const control = {
      type: type,
      name: `control_${type}_${fieldId}`,
      fieldName: `control_${type}_${fieldId}`,
      label: label,
      order: 0,
      defaultValue: "",
      value: "",
      className: "col-md-12",
      readonly: false,
      information: "",
      isPII: pii_attributes.includes(key),
      attrName: key,
      encoding: "utf-8",
      required: false,
      isInteger: false,
      decimalPlace: 0,
      dateFormat: format,
      timeFormat: "HH:mm",
      isMultiple: false,
      isAjax: false,
      dataOptions: [],
      ajaxDataUrl: "",
      isChecked: false,
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
