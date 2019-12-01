import {faEdit, faCalculator, faCalendarAlt, faClock, faCheck, faDatabase} from '@fortawesome/free-solid-svg-icons';

var FORM_CONSTANTS = {};
var CONTROL_CONSTANTS = {};
var TYPE_MAPPER = {};

FORM_CONSTANTS.Row = {
    name: "",
    label: "",
    order: 0,
    controls: [],
};

FORM_CONSTANTS.Section = {
    name: "",
    label: "",
    clientKey: "",
    order: 0,
    row: FORM_CONSTANTS.Row,

    // config
    labelPosition: "left", // left or top

    // for dynamic
    isDynamic: false,
    minInstance: 1,
    maxInstance: 0, //0 for unlimited
    instances: [], // for save data in GUI to easily to retrieve @@
};

FORM_CONSTANTS.Control = {
    uuid: "",
    type: "",
    name: "",
    fieldName: "",
    label: "",
    order: 0,
    defaultValue: "",
    value: "",
    className: 'col-md-12',
    readonly: false,
    information: "",
    isPII: false,
    attrName: "",
    encoding: "utf-8",

    // validation
    required: false,

    // attr for number
    isInteger: false,
    decimalPlace: 0,

    // attr for datePicker
    dateFormat: null,

    // attr for timePicker
    timeFormat: "HH:mm", // enhancement later

    // attr for select
    isMultiple: false,
    isAjax: false, // is ajax data source or not
    dataOptions: [], // static data source
    ajaxDataUrl: "", // ajax data source

    // attr for checkbox
    isChecked: false
};

FORM_CONSTANTS.Type = {
    text: {
        label:"Text Input",
        icon: faEdit
    },
    number: {
        label:"Number Input",
        icon: faCalculator
    },
    datepicker: {
        label: "Date Picker",
        icon: faCalendarAlt
    },
    timepicker: {
        label:"Time Picker",
        icon: faClock
    },
    select: {
        label: "Select Option",
        icon: faDatabase
    },
    checkbox: {
        label:"Checkbox",
        icon: faCheck
    },
};

FORM_CONSTANTS.OptionDefault = {
    id: "",
    text: ""
};

CONTROL_CONSTANTS.Encoding = {
    'utf-8': "UTF-8",
    'iso-8859–1': "ISO-8859–1",
    'windows-1251': "Windows-1251"
};

CONTROL_CONSTANTS.DateFormat = {
    // rule: date picker format => moment format
    'DD/MM/YYYY': "D/M/YYYY",
    'dd/mm/yy': "D/M/YYYY",
    'dd-mm-yy': "D-M-YYYY",
    'mm/dd/yy': "M/D/YYYY",
    'mm-dd-yy': "M/D/YYYY",
    'yy/mm/dd': "YYYY/M/D",
    'yy-mm-dd': "YYYY-M-D",
};

CONTROL_CONSTANTS.TimeFormat = {
    'H:m': 'H:m',
    'HH:mm': 'HH:mm',
    'h:m p': "h:m A",
    'hh:mm p': "hh:mm A"
};

TYPE_MAPPER.typeInput = {
  "Text": "text",
  "Date": "datepicker",
  "Array[Text]": "select",
  "Array[Object]": "select",
  "Boolean": "checkbox",
  "Number": "number"
}

TYPE_MAPPER.inputType = {
  "text": "Text",
  "number": "Number",
  "datepicker": "Date",
  "timepicker": "Date",
  "select": "Array[Text]",
  "checkbox": "Boolean"
}

export {
    FORM_CONSTANTS,
    CONTROL_CONSTANTS,
    TYPE_MAPPER
}
