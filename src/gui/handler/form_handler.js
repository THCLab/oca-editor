import {FORM_CONSTANTS} from "@/config/constants";

const FormHandler = {};

FormHandler.dynamicTemplate = function(row) {
    var controls = row.controls;
    var controlData = {};

    _.each(controls, control => {
        controlData[control.fieldName] = !_.isEmpty(control.defaultValue) ? control.defaultValue : "";
    });

    return controlData;
};

function getControlValue(control, selectorOutside) {
    switch (control.type) {
        case 'number': {
            if (_.isEmpty(control.value) || _.isNaN(control.value)) {
                return 0;
            }
        }
        default:
            return control.value;
    }
}

FormHandler.getValue = function (form) {
    var formData = {};

    if (!form.section.isDynamic) {
        var controlData = {};

        var controls = form.section.row.controls;

        // retrieve value in control
        _.each(controls, control => {
            // special get value
            controlData[control.fieldName] = getControlValue(control, `#${form.section.name}_gui_body`);
        });

        // set data
        formData[form.section.clientKey] = controlData;
    } else {
        var sectionData = [];
        _.each(form.section.instances, (instance, insIndex) => {
            var controlData = {};

            var controls = instance.controls;

            // retrieve value in control
            _.each(controls, control => {
                controlData[control.fieldName] = getControlValue(control, `#${form.section.name}_gui_body .rowDynamic_${insIndex}`);
            });

            // populate data
            sectionData.push(controlData);
        });

        formData[form.section.clientKey] = sectionData;
    }

    return formData;
};

function setControlValue(control, value, selectorOutside, firstInit = true) {
    if (firstInit) {
        control.value = value;
        return;
    }

    switch (control.type) {
        default:
            control.value = value;
    }
}

FormHandler.setValue = function(form, values) {
    // though the values - static form first
    _.each(values, formData => {
        if (form.section === undefined || form.section.isDynamic) {
            return;
        }

        var controls = form.section.row.controls;
        _.each(controls, controlInfo => {
            if (formData[controlInfo.fieldName]) {
                setControlValue(controlInfo, formData[controlInfo.fieldName], `#${form.section.name}_gui_body`, false);
            }
        });
    });

    // for the dynamic form
    _.each(values, formData => {
        if (form.section === undefined || !form.section.isDynamic || !_.isArray(formData)) {
            return;
        }

        form.section.instances = [];
        var insIndex = 0;
        _.each(formData, instanceData => {
            var template = _.cloneDeep(form.section.row);

            // push into a new instance
            form.section.instances.push(template);

            // populate data into it
            var controls = template.controls;

            // push data to control
            _.each(controls, controlInfo => {
                if (instanceData[controlInfo.fieldName]) {
                    setControlValue(controlInfo, instanceData[controlInfo.fieldName], `#${form.section.name}_gui_body .rowDynamic_${insIndex++}`);
                }
            });
        });
    });
};

FormHandler.clearErrorField = function() {
    $("input.control-error").removeClass('control-error');
};

FormHandler.validate = function (form) {
    FormHandler.clearErrorField();

    if (!form.section.isDynamic) {
        validate_static_form(form.section);
    } else {
        validate_dynamic_form(form.section);
    }

    return ($("input.control-error").length > 0);
};

var validate_static_form = function (sectionInfo) {
    // flatten rows
    var controls = sectionInfo.row.controls;
    _.each(controls, controlInfo => {
        if (!controlInfo.required) {
            return;
        }

        let value = getControlValue(controlInfo, `#${sectionInfo.name}_gui_body`);
        if (_.isEmpty(value)) {
            // special case for number @@
            if (controlInfo.type === 'number' && _.isNumber(value) && !_.isNaN(value)) {
                return;
            }

            // set error here
            $(`#${sectionInfo.name}_gui_body input[name='${controlInfo.fieldName}']`).addClass('control-error');
        }
    });
};

var validate_dynamic_form = function (sectionInfo) {
    _.each(sectionInfo.instances, (instance, insIndex) => {

        // flatten rows
        var controls = instance.controls;

        // retrieve value in control
        _.each(controls, controlInfo => {
            if (!controlInfo.required) {
                return;
            }

            let value = getControlValue(controlInfo, `#${sectionInfo.name}_gui_body .rowDynamic_${insIndex}`);
            if (_.isEmpty(value)) {
                // special case for number @@
                if (controlInfo.type === 'number' && _.isNumber(value) && !_.isNaN(value)) {
                    return;
                }

                // set error here
                $(`#${sectionInfo.name}_gui_body .rowDynamic_${insIndex} input[name='${controlInfo.fieldName}']`).addClass('control-error');
            }
        });
    });
};

// re-structure (extend) to make sure the data is correct
FormHandler.recorrectStructure = function (form) {
    // section re-build
    let row = _.cloneDeep(form.section.row);
    form.section = _.extend(_.cloneDeep(FORM_CONSTANTS.Section), form.section);
    form.section.row = row;

    // row
    let controls = _.cloneDeep(form.section.row.controls);
    form.section.row = _.extend(_.cloneDeep(FORM_CONSTANTS.Row), form.section.row);
    form.section.row.controls = controls;

    // control
    _.each(form.section.row.controls, (controlInfo, index) => {
        // prepare data deep
        let staticSource = _.cloneDeep(controlInfo.dataOptions);

        // extend
        form.section.row.controls[index] = _.extend(_.cloneDeep(FORM_CONSTANTS.Control), controlInfo);

        // special information need to clone
        form.section.row.controls[index].dataOptions = staticSource;
    });

    return form;
};

export {
    FormHandler
}
