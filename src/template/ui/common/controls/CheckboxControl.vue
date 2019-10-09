<template>
    <div class="controlItemWrapper" :class="control.className" :data-control-name="control.name">
        <div class="controlItem row" :id="control.name" v-if="labelPosition === 'left'">
            <slot name="label"/>

            <div :class="inputClass" class="input-group">
                <div class="text-center w-100">
                    <input type="checkbox" :name="control.fieldName" :checked="control.isChecked" :disabled="control.readonly">
                </div>
            </div>

            <slot name="options"/>
            <slot name="information"/>
        </div>
        <div class="controlItem row" :id="control.name" v-else>
            <div class="form-group col-md-12">
                <label> {{control.label}} </label>
                <span v-show="control.required"> *</span>
                <div class="input-group">
                    <div class="text-center w-100">
                        <input type="checkbox" :name="control.fieldName" :checked="control.isChecked" :disabled="control.readonly">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CheckboxControl",
        props: ['control', 'labelPosition', 'inputClass'],
    }
</script>

<style scoped>

</style>
