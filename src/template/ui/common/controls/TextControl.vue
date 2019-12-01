<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div :class="inputClass" class="input-group">
                <input type="text" class="form-control"
                       :readonly="control.readonly"
                       :name="control.fieldName"
                       :value="demo_value">
            </div>

            <slot name="options"/>
            <slot name="information"/>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
                <div class="input-group">
                    <input type="text" class="form-control"
                           :readonly="control.readonly"
                           :name="control.fieldName"
                           :value="demo_value">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextControl",
        props: ['control', 'labelPosition', 'inputClass'],
        computed: {
            demo_value() {
                if (!_.isEmpty(this.control.defaultValue)) {
                    return this.control.defaultValue;
                }

                return "";
            }
        }
    }
</script>

<style scoped>

</style>
