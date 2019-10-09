<template>
    <div>
        <div class="row datePickerControl" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div class="col-md-8">
                <div class="input-group">
                    <ControlDatePicker v-model="control.value" :readonly="this.control.readonly" :options="options" />

                    <div class="input-group-append">
                    <span class="input-group-text">
                        <font-awesome-icon :icon="icon"></font-awesome-icon>
                    </span>
                    </div>
                </div>
            </div>

            <slot name="information"/>
        </div>
        <div class="form-group" v-else>
            <label> {{control.label}} </label>
            <span v-show="control.required"> *</span>

            <div class="input-group">
                <ControlDatePicker v-model="control.value" :readonly="this.control.readonly" :options="options" />

                <div class="input-group-append">
                    <span class="input-group-text">
                        <font-awesome-icon :icon="icon"></font-awesome-icon>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_CONSTANTS} from "@/config/constants";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {Hooks} from '@/gui/components/hook_lists';
    import {CONTROL_TYPES} from "@/config/control_constant";
    import ControlDatePicker from '@/third_party_controls/DatePickerControl';

    export default {
        name: "DatePickerControl",
        components: {FontAwesomeIcon, ControlDatePicker},
        props:['control', 'labelPosition'],
        data: () => ({
            icon: null,
            options: {
            },
        }),
        created() {
            // set date format
            this.options.dateFormat = this.control.dateFormat;

            // get base icon
            this.icon = CONTROL_TYPES[this.control.type].icon;

            // if this control already have value, set it (value => default value => settings)
            if (!_.isEmpty(this.control.value)) {
                return; // stop
            }

            // default value
            if (!_.isEmpty(this.control.defaultValue)) {
                this.control.value = this.control.defaultValue;
                return;
            }
        },
        mounted() {
            Hooks.Control.afterInit.run(this.control);
        }
    }
</script>

<style scoped>
</style>
